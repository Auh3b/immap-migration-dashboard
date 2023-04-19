import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
// @ts-ignore
import { addLayer, removeLayer, selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
//@ts-ignore
import { GeoJsonLayer } from '@deck.gl/layers';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
import timelineSource from 'data/sources/timelineSource';
import { useEffect, useState } from 'react';
import AtlasIcon from 'assets/img/icon-atlas.png';
import { LEGEND_TYPES } from '@carto/react-ui';
import useCustomDataLoad from './hooks/useCustomDataLoad';
import {
  Feature,
  FeatureCollection,
  featureCollection,
  point,
} from '@turf/helpers';
import { IconGroupConfig, iconGroupsConfig } from './utils/surveyIconGroup';

export const SURVEY_TIMELINE_LAYER_ID = 'surveyTimelineLayer';

class TimelineSurvey extends CompositeLayer<any, any> {
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
      const newFeature = features
        //@ts-ignore
        .filter(filterFunction)
        //@ts-ignore
        .map(coordinatesAccessor)
        //@ts-ignore
        .map((d) => point(d, { name, color }));
      outputFeatures = [...outputFeatures, ...newFeature];
    }

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
    //@ts-ignore
    if (changeFlags.dataChanged && this.props.data) {
      //@ts-ignore
      if (!this.state.data) {
        //@ts-ignore
        const data = this.aggregateFeatures(this.props.data, iconGroupsConfig);
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
      if (this.state.data) {
        //@ts-ignore
        this.props.onGeojsonLoad(this.state.data, {
          propName: 'data',
          layer: this,
        });
        return;
      }
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
          // visible: this.checkVisibility(),
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

export default function SurveyTimelineLayer() {
  const dispatch = useDispatch();
  const [data, setData] = useState<null | any[]>(null);
  const { layers: loadedLayers } = useSelector(
    (state: RootState) => state.carto,
  );
  const { surveyTimelineLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, surveyTimelineLayer?.source),
  );

  useEffect(() => {
    (async function fetchData() {
      const { data } = await fetchLayerData({
        ...timelineSource,
        source: timelineSource.data,
        format: 'geojson',
      });
      setData(data);
    })();
  }, []);

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: surveyTimelineLayer,
  });
  //@ts-ignore
  delete cartoLayerProps.onDataLoad;

  const [onGeojsonLoad] = useCustomDataLoad({ source });

  if (surveyTimelineLayer && source && data) {
    return new TimelineSurvey({
      ...cartoLayerProps,
      data: new Promise((resolve, reject) => {
        resolve(data);
      }),
      id: SURVEY_TIMELINE_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      dispatch,
      source,
      loadedLayers,
      onGeojsonLoad,
      iconGroups: [...iconGroupsConfig],
    });
  }
}
