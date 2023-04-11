import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';

import { LEGEND_TYPES } from '@carto/react-ui';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import useGetPathname from 'hooks/useGetPathname';
import { ROUTE_PATHS } from 'routes';

export const HOTSPOTS_LAYER_ID = 'hotspotsLayer';

const HOTSPOT_COLOR = [231, 63, 116];
const HOTSPOT_LABEL = new Map([
  ['default', 'Migrantes'],
  [ROUTE_PATHS.DINÁMICA_AURORA, 'Aurora enganches'],
]);

export default function HotspotsLayer() {
  const dispatch = useDispatch();
  const pathname = useGetPathname();
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );

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

  if (hotspotsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: HOTSPOTS_LAYER_ID,
      getFillColor: HOTSPOT_COLOR,
      stroked: false,
      pointRadiusMinPixels: 3,
      pickable: true,
      onDataLoad: (data: any) => {
        dispatch(
          updateLayer({
            id: HOTSPOTS_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
