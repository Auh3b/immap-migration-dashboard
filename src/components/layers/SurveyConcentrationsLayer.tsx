import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
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
import { Color, color, extent, interpolateYlOrRd, scaleSequential } from 'd3';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { LEGEND_TYPES } from '@carto/react-ui';
import { useCartoLayerProps } from '@carto/react-api';
import { UNICEF_COLORS } from 'theme';

const light = color('white');
const dark = color('black');

function getExtent(features: any[]) {
  return features.map((f) => f.properties.point_count);
}

function getColorRange(numbers: number[]) {
  return extent(numbers);
}

function colorScale(extent: [number, number]) {
  return scaleSequential(['#ffffb2', '#b10026']).domain(extent);
}

function getColor(value: number, extent: [number, number]) {
  return color(colorScale(extent)(value));
}

function getTextColor(value: number, extent: [number, number]) {
  //@ts-ignore
  const hslColor = color(getColor(value, extent).formatHsl());
  //@ts-ignore
  if (hslColor.l > 0.5) {
    return getFillColor(dark);
  }
  return getFillColor(light);
}

function getFillColor(color: Color) {
  //@ts-ignore
  const colorValue = Object.values(color);
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

//@ts-ignore
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
      const index = new SuperCluster({ maxZoom: 12, radius: props.sizeScale });
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
      if (!this.state.clusterValues) {
        //@ts-ignore
        this.setState({
          clusterValues,
        });
      }
    }
  }
  renderLayers() {
    const data = {
      type: 'FeatureCollection',
      //@ts-ignore
      features: this.state.data,
      attributes: { background: true },
    };
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
          opacity: 1,
          stroked: false,
          getTextSize: 18,
          getTextColor: (d: any) => {
            return d.properties.cluster
              ? getTextColor(d.properties.point_count, clusterValues)
              : [0, 0, 0];
          },
          textOutlineWidth: 0,
          textOutlineColor: [255, 255, 255],
          textFontWeight: 'bold',
          textFontSettings: {
            sdf: true,
          },
          getText: (d: any) =>
            d.properties.cluster ? String(d.properties.point_count) : '',
          getFillColor: (d: any) =>
            d.properties.cluster
              ? getFillColor(getColor(d.properties.point_count, clusterValues))
              : [51, 66, 77, 0],
          pointType: 'circle+text',
          getPointRadius: (d: any) =>
            d.properties.cluster ? d.properties.point_count * 10 : 10,
          pointRadiusMinPixels: 25,
        }),
      ),
    ];
  }
}

const layerConfig = {
  title: 'Concentración de respuestas Aurora',
  visible: true,
  switchable: true,
  legend: {
    type: LEGEND_TYPES.CONTINUOUS_RAMP,
    collapsible: false,
    labels: [
      { label: 'Bajo', value: 0 },
      { label: 'Alto', value: 1 },
    ],
    colors: [
      [255, 255, 178],
      [177, 0, 38],
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
        type: MAP_TYPES.TABLE,
        connection: hotSpotSource.connection,
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
      pickable: false,
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
