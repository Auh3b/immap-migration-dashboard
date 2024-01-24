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
import useCustomDataLoad from './hooks/useCustomDataLoad';
import { useEffect, useState } from 'react';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { dequal } from 'dequal';

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
        collapsible: true,
      },
    },
  };
};

export default function ServiciFeedbackNnaLayer() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
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

  if (serviciFeedbackNnaLayer && source && data) {
    return new CustomGeoJsonLayer({
      ...cartoLayerProps,
      id: SERVICI_FEEDBACK_NNA_LAYER_ID,
      data,
      getFillColor: (d: any) => d3Hex2RGB(+d?.properties?.push || 0),
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      stroked: true,
      pointRadiusMinPixels: 5,
      opacity: 0.5,
      pickable: true,
      getLineColor: [124, 33, 62, 0],
      getPointRadius: 8,
      pointRadiusScale: 1,
      onGeojsonDataLoad,
      addLegend: () => {
        dispatch(
          updateLayer({
            id: SERVICI_FEEDBACK_NNA_LAYER_ID,
            layerAttributes: { ...layerConfig.layerAttributes },
          }),
        );
      },
      removeLegend: () => {
        dispatch(removeLayer(SERVICI_FEEDBACK_NNA_LAYER_ID));
      },
    });
  }
}
