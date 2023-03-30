import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';
import { color } from 'd3';

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
  const dispatch = useDispatch();
  const { premiseServicesLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, premiseServicesLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: premiseServicesLayer,
  });

  if (premiseServicesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: PREMISE_SERVICES_LAYER_ID,
      getFillColor: PREMISE_SERVICES_COLORS.Punto,
      stroked: false,
      pointRadiusMinPixels: 3,
      pickable: true,
      onDataLoad: (data: any) => {
        dispatch(
          updateLayer({
            id: PREMISE_SERVICES_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
