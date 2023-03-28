import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';

export const PREMISE_SERVICES_LAYER_ID = 'premiseServicesLayer';

export default function PremiseServicesLayer() {
  const { premiseServicesLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, premiseServicesLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (premiseServicesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: PREMISE_SERVICES_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
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
