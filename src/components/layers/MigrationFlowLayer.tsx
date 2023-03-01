import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import { updateLayer } from '@carto/react-redux';

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

const layerConfig = {
  title: 'Flujo de migración',
  visible: true,
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
  const [jsonData, setJsonData] = useState([]);
  const { migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const dispatch = useDispatch();

  // @ts-ignore

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchLayerData({
        type: MAP_TYPES.TABLE,
        source: 'carto-dw-ac-4v8fnfsh.shared.kuery24022023',
        connection: 'carto_dw',
        format: FORMATS.JSON,
      });

      console.log(data);

      setJsonData(
        data.map((d: any) => ({
          ...d,
          from: {
            coordinates: [d['long_paisn'], d['lat_paisna']],
          },
          to: {
            coordinates: [d['longitud'], d['latitud']],
          },
        })),
      );
    }
    fetchData();
    dispatch(
      updateLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        layerAttributes: { ...layerConfig },
      }),
    );

    return () => {
      setJsonData([]);
    };
  }, []);

  if (migrationFlowLayer && jsonData) {
    return new ArcLayer({
      data: new Promise((resolve, reject) => {
        resolve(jsonData);
      }),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => d.from.coordinates,
      getTargetPosition: (d: any) => d.to.coordinates,
      getWidth: 1,
      getHeight: 1,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      onDataLoad: () => {
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
