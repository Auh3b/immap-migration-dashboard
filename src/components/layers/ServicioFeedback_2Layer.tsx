import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
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

export const SERVICIO_FEEDBACK_2_LAYER_ID = 'servicioFeedback_2Layer';

export default function ServicioFeedback_2Layer() {
  const { servicioFeedback_2Layer } = useSelector((state: RootState) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, servicioFeedback_2Layer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (servicioFeedback_2Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SERVICIO_FEEDBACK_2_LAYER_ID,
      pointType: 'icon',
      getIconSize: (d:any) => 14,
      getIconColor: (d:any) => d3Hex2RGB(+d?.properties?.push || 0), // Remember to set mask to true in your icon mapping to enable colouring
      getIcon: () => "circleShaded",
      iconMapping,
      iconAtlas: circleMarker,
      pointRadiusMinPixels: 4,
      pickable: true,
    });
  }
}
