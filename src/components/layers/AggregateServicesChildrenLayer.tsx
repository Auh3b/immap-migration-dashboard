import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';

export const AGGREGATE_SERVICES_CHILDREN_LAYER_ID =
  'aggregateServicesChildrenLayer';

export default function AggregateServicesChildrenLayer() {
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
      getFillColor: [124, 21, 12, 0],
      pointRadiusMinPixels: 2,
      pickable: true,
      stroked: false,
      onHover: (info: any) => {
        if (info?.object) {
          info.object = {
            // @ts-ignore
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
