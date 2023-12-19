import { GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import { WebMercatorViewport } from '@deck.gl/core';
import { CompositeLayer } from 'deck.gl';
// @ts-ignore
import { CollisionFilterExtension } from '@deck.gl/extensions';

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
  return text_map;
};

const keys = {
  aggregated_count: 'Count',
};

const pathGenerator = ({ data, viewState, offset }: any) => {
  const [x0, y0] = data;
  const getViewport = new WebMercatorViewport({
    ...viewState,
  });

  const pixelCoords = getViewport.project([x0, y0]);
  const [x1, y1] = getViewport.unproject(pixelCoords.map((d) => d + offset));
  const path = [x0, y0, x1, y1];
  console.log(path);
  return path;
};

class AnimatedCircleLayer extends CompositeLayer<any, any> {
  constructor(props: any) {
    super(props);
  }
  renderLayers() {
    // @ts-ignore
    const { data, scalePoints, endPoint, viewState, color, getText } =
      this.props;
    const getScaledFigure = scalePoints(data);
    return [
      // new PathLayer({
      //   data: data.features,
      //   getPath: (d, { index }) =>
      //     pathGenerator({
      //       data: d.geometry.coordinates,
      //       viewState,
      //       offset: index % 2 === 0 ? 20 : -20,
      //     }),
      //   positionFormat: `XY`,
      //   widthScale: 20,
      //   getColor: [255, 87, 51, 255],
      //   widthMinPixels: 2,
      //   getWidth: 10,
      // }),

      new GeoJsonLayer(
        // @ts-ignore
        this.getSubLayerProps({
          id: 'circle-fill',
          data,
          pointType: 'circle',
          stroked: false,
          pickable: false,
          pointRadiusScale: 1,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) => getScaledFigure(d.properties.aggregated_count),
          getFillColor: [...color, 200],
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
            getScaledFigure(d.properties.aggregated_count) * 1.75,
          getFillColor: [...color, 25],
          // text-options
          getText: (d) => generateText(d.properties, keys),
          getTextSize: 16,
          getTextPixelOffset: (d, { index }) =>
            index % 2 === 0
              ? [0, -getScaledFigure(d.properties.aggregated_count) * 1.75]
              : [0, getScaledFigure(d.properties.aggregated_count) * 1.75],
          getTextColor: [255, 255, 255, 255],
          getTextBackgroundColor: [0, 0, 0, 150],
          getTextAlignmentBaseline: 'top',
          textBackgroundPadding: [2, 2],
          textBackground: true,
          textBillboard: true,
          extensions: [new CollisionFilterExtension()],
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
          pickable: true,
          pointRadiusUnits: 'pixels',
          // @ts-ignore
          getPointRadius: (d) =>
            getScaledFigure(d.properties.aggregated_count) * endPoint,
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
