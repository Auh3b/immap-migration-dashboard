import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';
import circleMarker from 'assets/img/circle_symbol.png';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';

const iconMapping = {
  circleFull: {
    x: 0,
    y: 0,
    width: 1180,
    height: 1180,
    mask: true,
  },
  circleShaded: {
    x: 1180,
    y: 0,
    width: 1180,
    height: 1180,
    mask: true,
  },
};

console.log(circleMarker);

export const SERVICI_FEEDBACK_NNA_LAYER_ID = 'serviciFeedbackNnaLayer';

const DATA = UNICEF_COLORS.slice(1, 6).map((color, index) => ({
  color,
  label: 'Push ' + (index + 1),
}));

const layerConfig = {
  id: SERVICI_FEEDBACK_NNA_LAYER_ID,
  layerAttributes: {
    title: 'Persona que viaja sin NNA',
    visible: true,
    legend: {
      type: LEGEND_TYPES.CATEGORY,
      labels: DATA.map((data) => data.label),
      colors: DATA.map((data) => data.color),
      collapsible: false,
    },
  },
};

export default function ServiciFeedbackNnaLayer() {
  const dispatch = useDispatch();
  const { serviciFeedbackNnaLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, serviciFeedbackNnaLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: serviciFeedbackNnaLayer,
  });

  if (serviciFeedbackNnaLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SERVICI_FEEDBACK_NNA_LAYER_ID,
      getFillColor: (d: any) => d3Hex2RGB(+d?.properties?.push || 0),
      stroked: false,
      pointRadiusMinPixels: 8,
      opacity: 0.5,
      pickable: true,
      onDataLoad: (data: any) => {
        dispatch(updateLayer(layerConfig));
        cartoLayerProps && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
