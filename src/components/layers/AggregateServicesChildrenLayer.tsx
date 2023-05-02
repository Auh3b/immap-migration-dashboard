import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';
import { RootState } from 'store/store';

export const AGGREGATE_SERVICES_CHILDREN_LAYER_ID =
  'aggregateServicesChildrenLayer';
export const AGGREGATE_SERVICE_COLORS = {
  NNA: d3Hex2RGB(5),
};

const DATA = Object.entries(AGGREGATE_SERVICE_COLORS).map(([label, color]) => ({
  color,
  label,
}));

const layerConfig = {
  title: 'Servicios para NNA',
  visible: true,
  legend: {
    type: LEGEND_TYPES.CATEGORY,
    labels: DATA.map((data) => data.label),
    colors: DATA.map((data) => data.color),
    collapsible: false,
  },
};

export default function AggregateServicesChildrenLayer() {
  const dispatch = useDispatch();
  const { aggregateServicesChildrenLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, aggregateServicesChildrenLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (aggregateServicesChildrenLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: AGGREGATE_SERVICES_CHILDREN_LAYER_ID,
      getFillColor: AGGREGATE_SERVICE_COLORS.NNA,
      pointRadiusMinPixels: 4,
      pickable: true,
      stroked: false,
      onDataLoad: (data: any) => {
        dispatch(
          updateLayer({
            id: AGGREGATE_SERVICES_CHILDREN_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
