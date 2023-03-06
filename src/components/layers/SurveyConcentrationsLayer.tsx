import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { FORMATS, fetchLayerData } from '@deck.gl/carto';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
//@ts-ignore
import { GeoJsonLayer } from '@deck.gl/layers';
import { RootState } from 'store/store';
import SuperCluster from 'supercluster';
import { useEffect, useState } from 'react';
import hotSpotSource from 'data/sources/hotspotSource';
import { color, extent, interpolateYlOrRd, scaleSequential } from 'd3';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { LEGEND_TYPES } from '@carto/react-ui';
import { useCartoLayerProps } from '@carto/react-api';

function getExtent(features: any[]) {
  return features.map((f) => f.properties.point_count);
}

function getColorRange(numbers: number[]) {
  return extent(numbers);
}

function colorScale(extent: [number, number]) {
  return scaleSequential().domain(extent).interpolator(interpolateYlOrRd);
}

function getFillColor(value: number, extent: [number, number]) {
  //@ts-ignore
  const colorValue = Object.values(color(colorScale(extent)(value)));
  colorValue.pop();
  return colorValue;
}

function checkFeatureCollection(data: any[]): any[] {
  return data.map((feature) => {
    if (feature.type) {
      return feature;
    }
    return feature.properties;
  });
}

export const SURVEY_CONCENTRATIONS_LAYER_ID = 'surveyConcentrationsLayer';

class CircleClusterLayer extends CompositeLayer {
  constructor(props: any) {
    super(props);
  }

  initializeState() {
    //@ts-ignore
    this.props.onDataLoad();
  }
  //@ts-ignore
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }
  //@ts-ignore
  updateState({ props, oldProps, changeFlags }) {
    const rebuildIndex =
      changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (rebuildIndex) {
      const index = new SuperCluster({ maxZoom: 16, radius: props.sizeScale });
      index.load(
        //@ts-ignore
        props.data,
      );
      //@ts-ignore
      this.setState({ index });
    }

    //@ts-ignore
    const z = Math.floor(this.context.viewport.zoom);
    //@ts-ignore
    if (rebuildIndex || z !== this.state.z) {
      //@ts-ignore
      this.setState({
        data: checkFeatureCollection(
          //@ts-ignore
          this.state.index.getClusters([-180, -85, 180, 85], z),
        ),
        z,
      });
      //@ts-ignore
      const clusterValues = getColorRange(getExtent(this.state.data));
      //@ts-ignore
      this.setState({
        clusterValues,
      });
    }
  }
  renderLayers() {
    //@ts-ignore
    const data = { type: 'FeatureCollection', features: this.state.data };
    //@ts-ignore
    const { clusterValues } = this.state;
    //@ts-ignore
    const { sizeScale, id } = this.props;

    return [
      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id,
          data,
          sizeScale,
          opacity: 0.9,
          stroked: false,
          //@ts-ignore
          getText: (d) =>
            d.properties.cluster ? d.properties.point_count : '',
          //@ts-ignore
          getFillColor: (d) =>
            d.properties.cluster
              ? getFillColor(d.properties.point_count, clusterValues)
              : [51, 66, 77, 0],
          pointType: 'circle+text',
          //@ts-ignore
          getPointRadius: (d) =>
            d.properties.cluster ? d.properties.point_count * 100 : 100,
          pointRadiusMinPixels: 15,
        }),
      ),
    ];
  }
}

const layerConfig = {
  title: 'Concentración de encuestas',
  visible: true,
  switchable: true,
  legend: {
    type: LEGEND_TYPES.CATEGORY,
    collapsible: false,
    labels: ['Bajo', 'Medio', 'Alto'],
    colors: [
      getFillColor(1, [1, 3]),
      getFillColor(2, [1, 3]),
      getFillColor(3, [1, 3]),
    ],
  },
};

export default function SurveyConcentrationsLayer() {
  const [data, setData] = useState(null);
  const { surveyConcentrationsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const dispatch = useDispatch();
  const source = useSelector((state) =>
    selectSourceById(state, surveyConcentrationsLayer?.source),
  );

  useEffect(() => {
    (async function () {
      const { data } = await fetchLayerData({
        source: hotSpotSource.data,
        ...hotSpotSource,
        format: FORMATS.GEOJSON,
      });

      //@ts-ignore
      setData(data);
    })();

    return () => {
      setData(null);
    };
  }, []);

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: surveyConcentrationsLayer,
  });

  delete cartoLayerProps.onDataLoad;

  if (surveyConcentrationsLayer && data) {
    return new CircleClusterLayer({
      ...cartoLayerProps,
      //@ts-ignore
      data: data?.features,
      id: SURVEY_CONCENTRATIONS_LAYER_ID,
      pointRadiusMinPixels: 2,
      pickable: true,
      sizeScale: 60,
      onDataLoad: (data: any) => {
        dispatch(
          updateLayer({
            id: SURVEY_CONCENTRATIONS_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
      },
      //@ts-ignore
      getPosition: (d) => d.geometry.coordinates,
    });
  }
}
