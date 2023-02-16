import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';

import { LEGEND_TYPES } from '@carto/react-ui';

export const HOTSPOTS_LAYER_ID = 'hotspotsLayer';

export const HOTSPOT_COLORS = {
  Hotspots: [231, 63, 116],
};

const DATA = Object.entries(HOTSPOT_COLORS).map(([label, color]) => ({
  color,
  label,
}));

const layerConfig = {
  title: 'Hotspots',
  visible: true,
  legend: {
    attr: 'hotspot',
    type: LEGEND_TYPES.CATEGORY,
    labels: DATA.map((data) => data.label),
    colors: DATA.map((data) => data.color),
    colllapsible: true,
    collapsed: true,
  },
};

export default function HotspotsLayer() {
  const dispatch = useDispatch();
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: hotspotsLayer,
  });

  if (hotspotsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: HOTSPOTS_LAYER_ID,
      getFillColor: HOTSPOT_COLORS.Hotspots,
      pointRadiusMinPixels: 10,
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
      onHover: (info: any) => {
        if (info?.object) {
          info.object = {
            // @ts-ignore
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
