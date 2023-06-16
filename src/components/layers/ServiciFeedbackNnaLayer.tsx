import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';
import circleMarker from 'assets/img/circle_symbol.png'
import d3Hex2RGB from 'utils/d3Hex2RGB';

const iconMapping = {
  circleFull: {
    x: 0,
    y: 0,
    width: 1180,
    height: 1180,
    mask: true,
  },
  circleShaded:{
    x: 1180,
    y: 0,
    width: 1180,
    height: 1180,
    mask: true,
  }
}

export const SERVICI_FEEDBACK_NNA_LAYER_ID = 'serviciFeedbackNnaLayer';

export default function ServiciFeedbackNnaLayer() {
  const { serviciFeedbackNnaLayer } = useSelector((state: RootState) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, serviciFeedbackNnaLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (serviciFeedbackNnaLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SERVICI_FEEDBACK_NNA_LAYER_ID,
            pointType: 'icon',
      getIconSize: (d:any) => 14,
      getIconColor: (d:any) => d3Hex2RGB(+d?.properties?.push || 0), // Remember to set mask to true in your icon mapping to enable colouring
      getIcon: () => "circleFull",
      iconMapping,
      iconAtlas: circleMarker,
      pointRadiusMinPixels: 4,
      pickable: true,
    });
  }
}
