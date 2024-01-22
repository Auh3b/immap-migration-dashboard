import { addLayer, removeLayer } from '@carto/react-redux';
import { GeoJsonLayer } from '@deck.gl/layers';
import { CompositeLayer } from 'deck.gl';
import AtlasIcon from 'assets/img/icon-atlas.png';
import { LEGEND_TYPES } from '@carto/react-ui';
import {
  Feature,
  FeatureCollection,
  featureCollection,
  point,
} from '@turf/helpers';
import {
  IconGroupConfig,
  iconGroupsConfig,
  getIconGroupConfig,
} from '../utils/surveyIconGroup';

class CustomTimelineLayer extends CompositeLayer<any, any> {
  constructor(props: Record<any, any>) {
    super(props);
  }

  checkLayerConfig(layer: string) {
    //@ts-ignore
    const { loadedLayers } = this.props;

    return loadedLayers[layer] ? true : false;
  }

  checkVisibility(d: any) {
    //@ts-ignore
    const { loadedLayers } = this.props;
    const visibleLayers = Object.values(loadedLayers)
      .filter(({ visible }) => visible === true)
      .map(({ id }: { id: string }) => id.split('-')[1]);
    return visibleLayers.includes(d.properties.name);
  }

  aggregateFeatures(data: FeatureCollection, layerConfig: IconGroupConfig) {
    let outputFeatures: Feature[] = [];
    const features = data.features.map(({ properties }) => properties);
    for (let {
      name,
      coordinatesAccessor,
      filterFunction,
      color,
    } of layerConfig) {
      const filteredGroup = features
        //@ts-ignore
        .filter(filterFunction);

      console.log(filteredGroup);

      if (filteredGroup.length) {
        const newFeature = filteredGroup
          //@ts-ignore
          .map((d) => point(coordinatesAccessor(d), { ...d, name, color }));
        outputFeatures = [...outputFeatures, ...newFeature];
      }
    }
    console.log(outputFeatures);

    return featureCollection(outputFeatures);
  }

  setCompositeLayerLegends() {
    //@ts-ignore
    const { iconGroups, id, dispatch, source } = this.props;
    let layerLegends: any = [];
    for (let { name, color } of iconGroups) {
      const layerId = `${id}-${name}`;
      const isLoaded = this.checkLayerConfig(layerId);
      if (!isLoaded) {
        const layerConfig = {
          id: layerId,
          source,
          layerAttributes: {
            title: `Aurora ${name}`,
            visible: true,
            legend: {
              type: LEGEND_TYPES.CATEGORY,
              labels: [name],
              colors: [color],
              collapsible: false,
            },
          },
        };
        dispatch(addLayer(layerConfig));
        layerLegends = [...layerLegends, layerConfig];
      }
    }
    //@ts-ignore
    this.setState({
      layerLegends,
    });
  }

  initializeState() {
    this.setCompositeLayerLegends();
  }

  //@ts-ignore
  updateState({ props, oldProps, changeFlags }) {
    console.log(this.props);
    //@ts-ignore
    if (changeFlags.dataChanged && this.props.data) {
      //@ts-ignore
      if (!this.state.data) {
        //@ts-ignore
        const data = this.aggregateFeatures(
          this.props.data,
          //@ts-ignore
          getIconGroupConfig(this.props.phase),
        );
        //@ts-ignore
        this.setState({
          data,
        });
        //@ts-ignore
        this.props.onGeojsonLoad(data, {
          propName: 'data',
          layer: this,
        });
        return;
      }

      //@ts-ignore
      const data = this.aggregateFeatures(
        this.props.data,
        //@ts-ignore
        getIconGroupConfig(this.props.phase),
      );
      //@ts-ignore
      this.setState({
        data,
      });

      //@ts-ignore
      this.props.onGeojsonLoad(data, {
        propName: 'data',
        layer: this,
      });
    }
  }

  finalizeState() {
    //@ts-ignore
    const { layerLegends } = this.state;
    //@ts-ignore
    const { dispatch } = this.props;

    for (let { id } of layerLegends) {
      dispatch(removeLayer(id));
    }
  }

  renderLayers() {
    //@ts-ignore
    const { data } = this.state;
    console.log(data);

    return [
      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          data,
          pointType: 'icon',
          getIconColor: (d: any) =>
            this.checkVisibility(d) ? d.properties.color : [0, 0, 0, 0],
          iconAtlas: AtlasIcon,
          getIcon: () => 'marker',
          getIconSize: () => 3,
          iconMapping: {
            marker: {
              x: 0,
              y: 0,
              width: 128,
              height: 128,
              anchorY: 128,
              mask: true,
            },
          },
          iconSizeScale: 8,
          iconSizeUnits: 'pixels',
          iconSizeMinPixels: 4,
          updateTriggers: {
            //@ts-ignore
            getIconColor: this.props.loadedLayers,
          },
        }),
      ),
    ];
  }
}

export default CustomTimelineLayer;
