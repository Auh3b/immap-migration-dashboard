//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { executeTask, Methods } from '@carto/react-workers';

interface getTileFeaturesProps {
  sourceId: string;
  params: getTileFeaturesPropsParams;
}

interface getTileFeaturesPropsParams {
  viewport: [number, number, number, number];
  tileFormat: TILE_FORMATS;
  limit?: number | null;
  filters?: any;
  filtersLogicalOperator?: string;
}

export default async function getTileFeatures({
  sourceId,
  params,
}: getTileFeaturesProps) {
  const { data } = await executeTask(sourceId, Methods.FEATURES_RAW, params);

  return data;
}
