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

interface ColorSet {
  color: string;
  label: string;
}

type ColorSetGroup = ColorSet[];

const getLegendData = (phase: number): ColorSetGroup => {
  const extent = phase === 2 ? 13 : 8;
  const arrayList = Array(extent).fill(0);

  return arrayList.map((d, i) => ({
    color: UNICEF_COLORS[i],
    label: i ? `Push ${i}` : 'Enganche',
  }));
};

const getlayerConfig = (colorSetGroup: ColorSetGroup) => {
  return {
    id: SERVICIO_FEEDBACK_2_LAYER_ID,
    layerAttributes: {
      title: 'Persona que viaja con NNA',
      visible: true,
      legend: {
        type: LEGEND_TYPES.CATEGORY,
        labels: colorSetGroup.map((data) => data.label),
        colors: colorSetGroup.map((data) => data.color),
        isStrokeColor: true,
        collapsible: false,
      },
    },
  };
};

export default function ServicioFeedback_2Layer() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase) || 1;
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

  const legendData = getLegendData(phase);

  const layerConfig = getlayerConfig(legendData);

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
