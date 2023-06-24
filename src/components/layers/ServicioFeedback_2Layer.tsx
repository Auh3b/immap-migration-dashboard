import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';

export const SERVICIO_FEEDBACK_2_LAYER_ID = 'servicioFeedback_2Layer';

const DATA = UNICEF_COLORS.slice(1, 6).map((color, index) => ({
  color,
  label: 'Push ' + (index + 1),
}));

const layerConfig = {
  id: SERVICIO_FEEDBACK_2_LAYER_ID,
  layerAttributes: {
    title: 'Persona que viaja con NNA',
    visible: true,
    legend: {
      type: LEGEND_TYPES.CATEGORY,
      labels: DATA.map((data) => data.label),
      colors: DATA.map((data) => data.color),
      isStrokeColor: true,
      collapsible: false,
    },
  },
};

export default function ServicioFeedback_2Layer() {
  const dispatch = useDispatch();
  const { servicioFeedback_2Layer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, servicioFeedback_2Layer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: servicioFeedback_2Layer,
  });

  if (servicioFeedback_2Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SERVICIO_FEEDBACK_2_LAYER_ID,
      filled: false,
      getLineColor: (d: any) => d3Hex2RGB(+d?.properties?.push || 0),
      stroked: true,
      getLineWidth: 2,
      lineWidthUnits: 'pixels',
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
