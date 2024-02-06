//@ts-nocheck

/* 
  This is a base layer that support multiple geometry types
  similar to the carto-layer but will still allow widgets to work
  if the dataset entries are more than 1,300 and blow zoom level 4.
*/

import { CompositeLayer, GeoJsonLayer } from 'deck.gl';

class CustomGeoJsonLayer extends CompositeLayer<any, any> {
  constructor(props: any) {
    super(props);
  }

  initializeState(params?: any): void {
    this.props?.addLegend();
  }

  updateState({ oldProps, props, context, changeFlags }: any): void {
    if (changeFlags.dataChanged && this.props.data) {
      if (!this.state.data) {
        this.setState({
          data: this.props.data,
        });
      }

      this.props.onGeojsonDataLoad?.(this.props.data, {
        propName: 'data',
        layer: this,
      });

      this.props?.addLegend();
    }
  }

  finalizeState(): void {
    this.props?.removeLegend();
  }

  renderLayers() {
    const {
      data,
      getFillColor = [0, 0, 0, 255],
      getLineColor = [0, 0, 0, 255],
      stroked = true,
      filled = true,
      pointRadiusMinPixels,
      opacity,
      pickable,
      getPointRadius,
      pointRadiusScale,
      getLineWidth = 1,
      pointRadiusUnits = 'pixels',
      lineWidthUnits = 'pixels',
    } = this.props;

    return [
      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          data,
          getFillColor,
          pointRadiusUnits,
          lineWidthUnits,
          stroked,
          filled,
          pointRadiusMinPixels,
          getLineWidth,
          opacity,
          pickable,
          getLineColor,
          getPointRadius,
          pointRadiusScale,
        }),
      ),
    ];
  }
}

export default CustomGeoJsonLayer;
