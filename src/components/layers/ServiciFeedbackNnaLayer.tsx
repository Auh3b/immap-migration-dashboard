import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';

export const SERVICI_FEEDBACK_NNA_LAYER_ID = 'serviciFeedbackNnaLayer';

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
    id: SERVICI_FEEDBACK_NNA_LAYER_ID,
    layerAttributes: {
      title: 'Persona que viaja sin NNA',
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

export default function ServiciFeedbackNnaLayer() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
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

  const legendData = getLegendData(phase);

  const layerConfig = getlayerConfig(legendData);

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
