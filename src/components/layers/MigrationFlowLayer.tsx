import { useSelector } from 'react-redux';
// @ts-ignore
import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

export default function MigrationFlowLayer() {
  const [jsonData, setJsonData] = useState([]);
  const { migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );

  // @ts-ignore
  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchLayerData({
        type: MAP_TYPES.TABLE,
        source:'carto-dw-ac-4v8fnfsh.private_aclavijo_c8f7e1ef.migration_flow_test',
        connection: 'carto_dw',
        format: FORMATS.JSON,
      });

      setJsonData(
        data.map((d: any) => ({
          ...d,
          from: {
            coordinates: [d['start_lng'], d['start_lat']],
          },
          to: {
            coordinates: [d['end_lng'], d['end_lat']],
          },
        })),
      );
    }

    fetchData();

    return () => {
      setJsonData([]);
    };
  }, []);

  if (jsonData && migrationFlowLayer) {
    return new ArcLayer({
      data: jsonData,
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => d.from.coordinates,
      getTargetPosition: (d: any) => d.to.coordinates,
      getWidth: 1,
      getHeight: 1,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
    });
  }
}
