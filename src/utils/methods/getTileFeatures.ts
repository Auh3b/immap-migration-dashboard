//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { executeTask, Methods } from '@carto/react-workers';
import executeExternalMethod from './executeExternalMethod';

interface getTileFeaturesProps {
  sourceId: string;
  params: getTileFeaturesPropsParams;
  global?: Boolean;
  methodName?:string;
  methodParams?:Record<string, any>
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
  global,
  methodName,
  methodParams,
}: getTileFeaturesProps) {
  const { data: _rawData } = await executeTask(sourceId, Methods.FEATURES_RAW, params);
  const  data = await executeExternalMethod({data: _rawData, methodName, params: methodParams})
  return data;
}
