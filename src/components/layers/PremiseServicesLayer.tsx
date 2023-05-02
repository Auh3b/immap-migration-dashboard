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
import premiseSource from 'data/sources/premiseSource';

export const PREMISE_SERVICES_LAYER_ID = 'premiseServicesLayer';

const premiseToken =
  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4IjoiaGVsbG8iLCJpYXQiOjE2ODE4MjY4NTEsImV4cCI6MTY5MDQ2Njg1MSwiaXNzIjoiaHR0cHM6Ly9hcGkubXkucHJlbWlzZS5jb20vZXhwb3J0cyIsInN1YiI6ImMxYzdhNGMyLTg3YWUtNDU4ZC05ZTI3LTQyZWM2MjkyNmFkOCJ9.SXTBwx0J0MMMlSJM7dERy5R7QzwRCtyuaH23BfNGLTk';

function popContext(implementor: string, principal: string, url: string) {
  return `<div style='display: flex; flex-direction: column; width: 150px;'>
    <p>Organización</p>
    <p>Socio Implementador: ${implementor}</p>
    <p>Socio Principal: ${principal}</p> 
  </div>`;
}

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

  useEffect(() => {
    (async function fetchData() {
      const { data } = await fetchLayerData({
        ...premiseSource,
        source: premiseSource.data,
        format: 'geojson',
      });
      setData(data);
    })();
  }, []);

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
      getPointRadius: 1000,
      pointRadiusScale: 5,
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
          const {
            org_pert1: implementor,
            org_pert2: principal,
            id_photo: url,
          } = info?.object?.properties;
          info.object = {
            // @ts-ignore
            html: popContext(implementor, principal, url),
            style: {},
          };
        }
      },
    });
  }
}
