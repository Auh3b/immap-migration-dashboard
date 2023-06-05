import { useDispatch, useSelector } from 'react-redux';
import { dequal } from 'dequal';
import { RootState } from 'store/store';
import { useMemo, useState } from 'react';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { SOURCE_COORD_MAP } from 'data/sources/sourceTypes';
import { featureCollection, point } from '@turf/helpers';
import getViewport from 'components/indicators/premise/utils/getViewport';
import handleMapTransitions from 'components/indicators/premise/utils/handleMapTransitions';

export default function useFeatureFocus() {
  const [data, setData] = useState(',');
  const dispatch = useDispatch();
  const _sources = useSelector(
    (state: RootState) => Object.entries(state.carto.dataSources) || [],
  );

  const { width, height } = useSelector(
    (state: RootState) => state.carto.viewState,
  );

  const coordinatesColumns = useMemo(() => {
    if (_sources.length) {
      return _sources.map(([name, value]) => SOURCE_COORD_MAP.get(name) || []);
    }
    return [];
  }, [_sources]);

  useCustomCompareEffectAlt(
    () => {
      //@ts-ignore
      if (_sources.length) {
        const sourcesPromises = _sources.map(
          async ([source, { filters, filtersLogicalOperator }]: any) => {
            const params = {
              filters,
              filtersLogicalOperator,
              tileFormat: TILE_FORMATS,
              //@ts-ignore
              limit: null,
            };
            //@ts-ignore
            return getTileFeatures({ sourceId: source, params, global: true });
          },
        );
        Promise.all(sourcesPromises)
          .then((_data) => {
            if (_data.length) {
              let _geojson: any[] = [];
              for (let i = 0; i < _data.length; i++) {
                const [longitude, latitude] = coordinatesColumns[i];
                const currentSet = _data[i].map((d: any) =>
                  point([d[longitude], d[latitude]]),
                );
                _geojson = [..._geojson, ...currentSet];
              }
              const geojson = featureCollection(_geojson);
              const { latitude, longitude, zoom } = getViewport({
                geojson,
                padding: 100,
                width,
                height,
              });
              handleMapTransitions({
                start: 500,
                end: 1000,
                params: {
                  longitude,
                  latitude,
                  zoom,
                },
                dispatch,
              });
              setData([longitude, latitude, zoom].join('-'));
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [dispatch, coordinatesColumns, _sources, width, height],
    dequal,
  );
}
