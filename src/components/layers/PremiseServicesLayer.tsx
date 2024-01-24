import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { removeLayer, selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';
import { color } from 'd3';
import CustomGeoJsonLayer from './CustomLayer/CustomGeoJsonLayer';
import useCustomDataLoad from './hooks/useCustomDataLoad';
import { useEffect, useState } from 'react';
import usePremiseSource from 'data/sources/premiseSource';
import premisePopup from './utils/premisePopup';

export const PREMISE_SERVICES_LAYER_ID = 'premiseServicesLayer';

export const PREMISE_SERVICES_COLORS = {
  Punto: [...Object.values(color(UNICEF_COLORS[0])).slice(0, -1)],
};

const DATA = Object.entries(PREMISE_SERVICES_COLORS).map(([label, color]) => ({
  color,
  label,
}));

const layerConfig = {
  title: 'Punto de servicio',
  visible: true,
  legend: {
    type: LEGEND_TYPES.CATEGORY,
    labels: DATA.map((data) => data.label),
    colors: DATA.map((data) => data.color),
    collapsible: false,
  },
};

export default function PremiseServicesLayer() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { premiseServicesLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, premiseServicesLayer?.source),
  );
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const selectPremiseByPhase = usePremiseSource();
  useEffect(() => {
    (async function fetchData() {
      const premiseSource = selectPremiseByPhase(phase || 1);
      const { data } = await fetchLayerData({
        ...premiseSource,
        source: premiseSource.data,
        format: 'geojson',
        headers: {
          'cache-control': 'max-age=300',
        },
      });
      setData(data);
    })();
  }, [phase]);

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: premiseServicesLayer,
  });
  delete cartoLayerProps.onDataLoad;

  const [onGeojsonDataLoad] = useCustomDataLoad({ source });

  if (premiseServicesLayer && source) {
    return new CustomGeoJsonLayer({
      ...cartoLayerProps,
      id: PREMISE_SERVICES_LAYER_ID,
      data: new Promise((resolve, reject) => resolve(data)),
      getFillColor: PREMISE_SERVICES_COLORS.Punto,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getLineColor: [124, 33, 62, 0],
      getPointRadius: 8,
      pointRadiusScale: 1,
      pointRadiusMinPixels: 5,
      onGeojsonDataLoad,
      addLegend: () => {
        dispatch(
          updateLayer({
            id: PREMISE_SERVICES_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
      },
      removeLegend: () => {
        dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID));
      },
      onHover: (info: any) => {
        if (info?.object) {
          info.object = {
            // @ts-ignore
            html: premisePopup({ data: info?.object?.properties }),
            style: {},
          };
        }
      },
    });
  }
}
