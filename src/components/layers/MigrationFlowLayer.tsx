import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer, GeoJson } from '@deck.gl/layers';
//@ts-ignore
import {CompositeLayer} from 'deck.gl';
//@ts-ignore
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

class TravelLayer extends CompositeLayer{
  constructor(props:any){
    super(props)
  }

  initializeState() {
    //@ts-ignore
    this.props.onDataLoads();
  }

    //@ts-ignore
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  renderLayers(){

    //@ts-ignore
    const { id, data, getSourcePosition, getTargetPosition, getWidth, getHeight, getSourceColor, getTargetColor, pickable} = this.props
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
          getSourceColor,
          getTargetColor,
          pickable,
        })
      )
    ]
  }
}

const layerConfig = {
  title: 'Flujo de migración',
  visible: true,
  switchable:true,
  legend: {
    type: LEGEND_TYPES.CONTINUOUS_RAMP,
    colors: [
      [0, 128, 200],
      [200, 0, 80],
    ],
    labels: [0, 1],
    collapsible: false,
  },
};

export default function MigrationFlowLayer() {
  const { viewport } = useSelector((state: RootState) => state.carto)
  const dispatch = useDispatch();
  const { hotspotsLayer, migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, migrationFlowLayer?.source),
  );

  // @ts-ignore
  async function fetchData() {
    // const { data } = await fetchLayerData({
    //   type: MAP_TYPES.TABLE,
    //   source: 'carto-dw-ac-4v8fnfsh.shared.kuery24022023',
    //   connection: 'carto_dw',
    //   format: FORMATS.JSON,
    // });
    const data = await getTileFeatures({
      sourceId: source.id,
      params: {
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON,
        limit: null,
        filters: source.filters,
        filtersLogicalOperator: source.filtersLogicalOperator
      }
    })
    return(data)
  }

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: migrationFlowLayer,
  });
  delete cartoLayerProps.onDataLoad

  if (hotspotsLayer && migrationFlowLayer && source) {
    return new TravelLayer({
      ...cartoLayerProps,
      data: fetchData(),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => ([+d['long_paisn'], +d['lat_paisna']]),
      getTargetPosition: (d: any) =>([d['longitud'], d['latitud']]),
      getWidth: 1,
      getHeight: 1,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      pickable: true,
      onDataLoads: () => {
        console.log('context')
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
