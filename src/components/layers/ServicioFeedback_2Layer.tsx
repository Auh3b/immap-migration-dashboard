import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer, fetchLayerData } from '@deck.gl/carto';
import { removeLayer, selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';
import CustomGeoJsonLayer from './CustomLayer/CustomGeoJsonLayer';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { dequal } from 'dequal';
import { useState } from 'react';
import useCustomDataLoad from './hooks/useCustomDataLoad';

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
  const [data, setData] = useState(null);
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

  delete cartoLayerProps.onDataLoad;

  const [onGeojsonDataLoad] = useCustomDataLoad({ source });

  const legendData = getLegendData(phase);

  const layerConfig = getlayerConfig(legendData);

  useCustomCompareEffectAlt(
    () => {
      if (source) {
        (async function () {
          const { data } = await fetchLayerData({
            ...source,
            source: source.data,
            format: 'geojson',
            headers: {
              'cache-control': 'max-age=300',
            },
          });
          setData(data);
        })();
      }
    },
    [source, phase],
    dequal,
  );

  if (servicioFeedback_2Layer && source) {
    return new CustomGeoJsonLayer({
      ...cartoLayerProps,
      id: SERVICIO_FEEDBACK_2_LAYER_ID,
      data,
      filled: false,
      getLineColor: (d: any) => d3Hex2RGB(+d?.properties?.push || 0),
      stroked: true,
      getLineWidth: 2,
      lineWidthUnits: 'pixels',
      pointRadiusMinPixels: 5,
      opacity: 0.5,
      pickable: true,
      pointRadiusUnits: 'pixels',
      getPointRadius: 8,
      pointRadiusScale: 1,
      onGeojsonDataLoad,
      addLegend: () => {
        dispatch(
          updateLayer({
            id: SERVICIO_FEEDBACK_2_LAYER_ID,
            layerAttributes: { ...layerConfig.layerAttributes },
          }),
        );
      },
      removeLegend: () => {
        dispatch(removeLayer(SERVICIO_FEEDBACK_2_LAYER_ID));
      },
    });
  }
}
