// @ts-nocheck
// import { centroid } from '@turf/turf';
import { CompositeLayer, GeoJsonLayer, TextLayer } from 'deck.gl';

class PolygonWithLabels extends CompositeLayer<any, any> {
  constructor(props: any) {
    super(props);
  }
  renderLayers() {
    const { data, getFillColor, phase } = this.props;
    return [
      new GeoJsonLayer(
        this.getSubLayerProps({
          id: 'countries-fill',
          data,
          getFillColor,
          stroked: true,
          getLineColor: [0, 0, 0, 255],
          getLineWidth: 1,
          lineWidthMinPixels: 0.5,
          updateTriggers: {
            getFillColor: phase,
          },
        }),
      ),
      // new TextLayer(
      //   this.getSubLayerProps({
      //     id: 'countries-label',
      //     data: data.features,
      //     getPosition: (d) => centroid(d).geometry.coordinates,
      //     getText: (d) => d.properties.NAME,
      //     getSize: 8,
      //     getColor: [0, 0, 0, 150],
      //     getAngle: 0,
      //     getTextAnchor: 'middle',
      //     getAlignmentBaseline: 'center',
      //   }),
      // ),
    ];
  }
}

export default PolygonWithLabels;
