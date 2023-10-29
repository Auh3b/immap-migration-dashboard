import { GeoJsonLayer } from '@deck.gl/layers';
import { CompositeLayer } from 'deck.gl';

class AnimatedCircleLayer extends CompositeLayer<any, any> {
  constructor(props: any) {
    super(props);
  }
  renderLayers() {
    // @ts-ignore
    const { data, scalePoints, endPoint } = this.props;
    return [
      new GeoJsonLayer(
        // @ts-ignore
        this.getSubLayerProps({
          id: 'circle-fill',
          data,
          pointType: 'circle',
          stroked: false,
          pointRadiusScale: 1,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) => scalePoints(d.properties.aggregated_count),
          getFillColor: [51, 218, 255, 200],
        }),
      ),
      new GeoJsonLayer(
        // @ts-ignore
        this.getSubLayerProps({
          id: 'circle-overlay',
          data,
          pointType: 'circle',
          stroked: false,
          pointRadiusScale: 1,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) =>
            scalePoints(d.properties.aggregated_count) * 1.75,
          getFillColor: [51, 218, 255, 25],
        }),
      ),
      new GeoJsonLayer(
        // @ts-ignore
        this.getSubLayerProps({
          id: 'circle-pulsing',
          data,
          pointType: 'circle',
          stroked: true,
          filled: false,
          pointRadiusScale: 1,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) =>
            scalePoints(d.properties.aggregated_count) * endPoint,
          lineWidthUnits: 'pixels',
          getLineColor: [255, 255, 255, 150],
          getLineWidth: 1,
          transitions: {
            // @ts-ignore
            getPointRadius: 500,
          },
          updateTriggers: {
            getPointRadius: endPoint,
          },
        }),
      ),
    ];
  }
}

export default AnimatedCircleLayer;
