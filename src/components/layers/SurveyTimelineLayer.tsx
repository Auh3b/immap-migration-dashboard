import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
// @ts-ignore
import {
  addLayer,
  removeLayer,
  selectSourceById,
  updateLayer,
} from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
//@ts-ignore
import { IconLayer } from '@deck.gl/layers';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
import timelineSource from 'data/sources/timelineSource';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { useEffect, useState } from 'react';
import AtlasIcon from 'assets/img/icon-atlas.png';
import { LEGEND_TYPES } from '@carto/react-ui';

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

  checkVisibility(layer: string) {
    const isLoaded = this.checkLayerConfig(layer);
    if (isLoaded) {
      //@ts-ignore
      const { loadedLayers } = this.props;
      return loadedLayers[layer].visible;
    }

    return false;
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
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  //@ts-ignore
  updateState({ props, oldProps, changeFlags }) {
    //@ts-ignore
    if (this.shouldUpdateState && this.props.data) {
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
    const { iconGroups, data, id } = this.props;

    let iconsLayerRenders: any[] = [];

    for (let {
      name,
      coordinatesAccessor,
      filterFunction,
      color,
    } of iconGroups) {
      const layerId = `${id}-${name}`;
      const iconLayer = new IconLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: name,
          data: data.filter(filterFunction),
          getPosition: coordinatesAccessor,
          getColor: color,
          iconAtlas: AtlasIcon,
          visible: this.checkVisibility(layerId),
          getIcon: (d: any) => 'marker',
          getSize: (d: any) => 4,
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
          sizeScale: 8,
        }),
      );
      iconsLayerRenders = [...iconsLayerRenders, iconLayer];
    }
    return iconsLayerRenders;
  }
}

export const iconGroupsConfig = [
  {
    name: 'Push 1',
    coordinatesAccessor: (d: any) => [+d['lon_mon'], +d['lat_mon']],
    filterFunction: (d: any) => +d['lon_mon'] !== 99999,
    color: d3Hex2RGB(1),
  },
  {
    name: 'Push 2',
    coordinatesAccessor: (d: any) => [+d['lon_mon2'], +d['lat_mon2']],
    filterFunction: (d: any) => +d['lon_mon2'] !== 999999,
    color: d3Hex2RGB(2),
  },
  {
    name: 'Push 3',
    coordinatesAccessor: (d: any) => [+d['lon_mon3'], +d['lat_mon3']],
    filterFunction: (d: any) => +d['lon_mon3'] !== 999999,
    color: d3Hex2RGB(3),
  },
  {
    name: 'Push 4',
    coordinatesAccessor: (d: any) => [+d['lon_mon4'], +d['lat_mon4']],
    filterFunction: (d: any) => +d['lon_mon4'] !== 999999,
    color: d3Hex2RGB(4),
  },
  {
    name: 'Push 5',
    coordinatesAccessor: (d: any) => [+d['lon_mon5'], +d['lat_mon5']],
    filterFunction: (d: any) => +d['lon_mon5'] !== 999999,
    color: d3Hex2RGB(5),
  },
  {
    name: 'Push 6',
    coordinatesAccessor: (d: any) => [+d['lon_mon6'], +d['lat_mon6']],
    filterFunction: (d: any) => +d['lon_mon6'] !== 999999,
    color: d3Hex2RGB(6),
  },
];

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
        format: 'json',
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
      iconGroups: [...iconGroupsConfig],
    });
  }
}
