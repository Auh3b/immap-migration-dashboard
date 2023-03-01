import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

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
  const dispatch = useDispatch();
  const { migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, migrationFlowLayer?.source),
  );

  // @ts-ignore
  async function fetchData() {
    const { data } = await fetchLayerData({
      type: MAP_TYPES.TABLE,
      source: 'carto-dw-ac-4v8fnfsh.shared.kuery24022023',
      connection: 'carto_dw',
      format: FORMATS.JSON,
    });
    
    return(data)
  }
  console.log('again')

  if (migrationFlowLayer && source) {
    return new ArcLayer({
      data: fetchData(),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => ([d['long_paisn'], d['lat_paisna']]),
      getTargetPosition: (d: any) =>([d['longitud'], d['latitud']]),
      getWidth: 1,
      getHeight: 1,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      pickable: true,
      onDataLoad: (data:any) => {
        // dispatch(
        //   updateLayer({
        //     id: MIGRATION_FLOW_LAYER_ID,
        //     layerAttributes: { ...layerConfig },
        //   }),
        // );
        // cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
