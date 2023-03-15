import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
// import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
//@ts-ignore
import { RootState } from 'store/store';
// import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { format, scaleLinear } from 'd3';
import distance from '@turf/distance';

type coordinates = [number, number];

const tripLength = (a: [number, number], b: [number, number]): number =>
  distance(a, b, { units: 'kilometers' });

const heightScale = scaleLinear().range([0.75, 0]).domain([0, 40075]);

const getHeight = (a: coordinates, b: coordinates) => {
  const distance = tripLength(a, b);
  const distanceScaled = heightScale(distance);
  return +format('.2f')(distanceScaled);
};

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

class TravelLayer extends CompositeLayer {
  constructor(props: any) {
    super(props);
  }

  initializeState() {
    //@ts-ignore
    this.props.onDataLoads();
  }

  //@ts-ignore
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const {
      id,
      data, 
      getSourcePosition,
      getTargetPosition,
      getWidth,
      getHeight,
      getTilt,
      getSourceColor,
      getTargetColor,
      pickable,
      //@ts-ignore
    } = this.props;
    return [
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id,
          data,
          getSourcePosition,
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          getSourceColor,
          getTargetColor,
          pickable,
        }),
      ),
    ];
  }
}

const layerConfig = {
  title: 'Flujo de migración',
  visible: true,
  switchable: true,
  legend: {
    type: LEGEND_TYPES.CONTINUOUS_RAMP,
    colors: [
      [0, 128, 200],
      [200, 0, 80],
    ],
    labels: [
      { label: 'Comenzar', value: 0 },
      { label: 'Finalizar', value: 1 },
    ],
    collapsible: false,
  },
};

export default function MigrationFlowLayer() {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const dispatch = useDispatch();
  const { hotspotsLayer, migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, migrationFlowLayer?.source),
  );

  async function fetchData() {
    const data = await getTileFeatures({
      sourceId: source.id,
      params: {
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON,
        limit: null,
        filters: source.filters,
        filtersLogicalOperator: source.filtersLogicalOperator,
      },
    });
    return data.map((d: any) => ({
      ...d,
      arcHeight: getHeight(
        [+d['long_paisn'], +d['lat_paisna']],
        [d['lon_eng'], d['lat_eng']],
      ) || 0.5,
    }));
  }

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: migrationFlowLayer,
  });
  delete cartoLayerProps.onDataLoad;

  if (hotspotsLayer && migrationFlowLayer && source) {
    return new TravelLayer({
      ...cartoLayerProps,
      data: fetchData(),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => [+d['long_paisn'], parseInt(d['lat_paisna'].replace(',', '.'))],
      getTargetPosition: (d: any) => [d['lon_eng'], d['lat_eng']],
      getWidth: 1,
      getHeight: 1,
      getTilt: 0,
      getSourceColor: layerConfig.legend.colors[0],
      getTargetColor: layerConfig.legend.colors[1],
      pickable: true,
      onDataLoad:(data:any)=>{
        console.log(data)
      },
      onDataLoads: () => {
        dispatch(
          updateLayer({
            id: MIGRATION_FLOW_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
      },
    });
  }
}
