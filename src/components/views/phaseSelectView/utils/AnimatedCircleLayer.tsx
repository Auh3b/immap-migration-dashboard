import { GeoJsonLayer } from '@deck.gl/layers';
import { CompositeLayer } from 'deck.gl';

const generateText = (
  d: Record<string, unknown>,
  keyMap: Record<string, string>,
) => {
  const object_array = Object.entries(d);
  const keys = Object.keys(keyMap);
  const filtered_array = object_array.filter(([key, value]) =>
    keys.includes(key),
  );
  const text_map = filtered_array
    .map(([key, value]) => `${keyMap[key] || key}: ${value}`)
    .join('\n');
  console.log(object_array, keys, filtered_array, text_map);
  return text_map;
};

const keys = {
  aggregated_count: 'Count',
};

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
          pickable: true,
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
          pointType: 'circle+text',
          stroked: false,
          pointRadiusScale: 1,
          pickable: false,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) =>
            scalePoints(d.properties.aggregated_count) * 1.75,
          getFillColor: [51, 218, 255, 25],
          // text-options
          getText: (d) => generateText(d.properties, keys),
          getTextSize: 16,
          getTextOffset: [5, 2],
          getTextColor: [255, 255, 255, 255],
          getTextBackgroundColor: [0, 0, 0, 150],
          getTextBackgroundPadding: [10, 10],
          textBackground: true,
          textBillboard: true,
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
          pickable: false,
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
