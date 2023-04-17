import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer, fetchLayerData } from '@deck.gl/carto';
import { removeLayer, selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import { LEGEND_TYPES } from '@carto/react-ui';
import { useEffect, useMemo, useState } from 'react';
import useGetPathname from 'hooks/useGetPathname';
import { ROUTE_PATHS } from 'routes';
import CustomGeoJsonLayer from './CustomLayer/CustomGeoJsonLayer';
import useCustomDataLoad from './hooks/useCustomDataLoad';
import mainSource from 'data/sources/mainSource';

export const HOTSPOTS_LAYER_ID = 'hotspotsLayer';

const HOTSPOT_COLOR = [231, 63, 116];
const HOTSPOT_LABEL = new Map([
  ['default', 'Migrantes'],
  [ROUTE_PATHS.DINÁMICA_AURORA, 'Aurora enganches'],
]);

export default function HotspotsLayer() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const pathname = useGetPathname();
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );

  useEffect(() => {
    (async function fetchData() {
      const { data } = await fetchLayerData({
        ...mainSource,
        source: mainSource.data,
        format: 'geojson',
      });
      setData(data);
    })();
  }, []);

  const layerConfig = useMemo(
    () => ({
      title: 'Primera conexión Aurora',
      visible: true,
      legend: {
        type: LEGEND_TYPES.CATEGORY,
        labels: [
          HOTSPOT_LABEL.get(`/${pathname}`) || HOTSPOT_LABEL.get('default'),
        ],
        colors: [HOTSPOT_COLOR],
        collapsible: false,
      },
    }),
    [pathname],
  );

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: hotspotsLayer,
  });

  delete cartoLayerProps.onDataLoad;

  const [onGeojsonDataLoad] = useCustomDataLoad({ source });

  if (hotspotsLayer && source && data) {
    return new CustomGeoJsonLayer({
      id: HOTSPOTS_LAYER_ID,
      data: new Promise((resolve, reject) => resolve(data)),
      getFillColor: HOTSPOT_COLOR,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getLineColor: [124, 33, 62],
      pointRadiusMinPixels: 3,
      onGeojsonDataLoad,
      addLegend: () => {
        dispatch(
          updateLayer({
            id: HOTSPOTS_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
      },
      removeLegend: () => {
        dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      },
    });
    // return new CartoLayer({
    //   ...cartoLayerProps,
    //   id: HOTSPOTS_LAYER_ID,
    //   getFillColor: HOTSPOT_COLOR,
    //   stroked: true,
    //   pointRadiusUnits: 'pixels',
    //   lineWidthUnits: 'pixels',
    //   pickable: true,
    //   getLineColor: [124, 33, 62],
    //   pointRadiusMinPixels: 3,
    //   onDataLoad: (data: any) => {
    //     dispatch(
    //       updateLayer({
    //         id: HOTSPOTS_LAYER_ID,
    //         layerAttributes: { ...layerConfig },
    //       }),
    //     );
    //     cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
    //   },
    // });
  }
}
