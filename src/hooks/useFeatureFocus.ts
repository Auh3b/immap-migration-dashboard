import { useDispatch, useSelector } from 'react-redux';
import useCustomCompareEffect from './useCustomCompareEffect';
import { dequal } from 'dequal';
import { RootState } from 'store/store';
import { useState } from 'react';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';

export default function useFeatureFocus() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const _sources = useSelector(
    (state: RootState) => Object.entries(state.carto.dataSources) || [],
  );
  // const _isReadys = _sources.map(([source, value])=> useSelector(
  //   (state) => selectAreFeaturesReadyForSource(state, source),
  // ))
  useCustomCompareEffectAlt(
    () => {
      //@ts-ignore
      console.log(_sources);
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
            setData(_data);
          })
          .catch((error) => console.log(error));
      }
    },
    [dispatch, _sources],
    dequal,
  );
  console.log(data);
}
