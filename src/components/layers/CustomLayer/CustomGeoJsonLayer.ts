//@ts-ignore
import { CompositeLayer, GeoJsonLayer } from 'deck.gl';
//@ts-ignore
// import { GeoJsonLayer } from '@deck.gl/layers';

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
    }
  }

  finalizeState(): void {
    this.props?.removeLegend();
  }

  renderLayers() {
    const {
      data,
      getFillColor,
      stroked,
      pointRadiusUnits,
      lineWidthUnits,
      pickable,
      getLineColor,
      pointRadiusMinPixels,
    } = this.props;

    return [
      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          data,
          getFillColor,
          stroked,
          pointRadiusUnits,
          lineWidthUnits,
          pickable,
          getLineColor,
          pointRadiusMinPixels,
        }),
      ),
    ];
  }
}

export default CustomGeoJsonLayer;
