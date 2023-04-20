import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';

export const AGGREGATE_SERVICE_LAYER_ID = 'aggregateServiceLayer';

export const AGGREGATE_SERVICE_COLORS = {
  Punto: d3Hex2RGB(7),
};

const DATA = Object.entries(AGGREGATE_SERVICE_COLORS).map(([label, color]) => ({
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

export default function AggregateServiceLayer() {
  const dispatch = useDispatch()
  const { aggregateServiceLayer } = useSelector((state: RootState) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, aggregateServiceLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source, layerConfig: aggregateServiceLayer  });

  if (aggregateServiceLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: AGGREGATE_SERVICE_LAYER_ID,
      getFillColor: AGGREGATE_SERVICE_COLORS.Punto,
      pointRadiusMinPixels: 3,
      pickable: true,
      onDataLoad:(data:any)=>{
         dispatch(
          updateLayer({
            id: AGGREGATE_SERVICE_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      }
    });
  }
}
