//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { executeTask, Methods } from '@carto/react-workers';
import executeExternalMethod from './methods/executeExternalMethod';

interface getProcessedDataProps {
  sourceId: string;
  params: getProcessedDataPropsParams;
  global?: Boolean;
  column?: string;
  methodName?:string;
  methodParams?:Record<string, any>
}

interface getProcessedDataPropsParams {
  viewport: [number, number, number, number];
  tileFormat: TILE_FORMATS;
  limit?: number | null;
  filters?: any;
  filtersLogicalOperator?: string;
}

export default async function getProcessedData({
  sourceId,
  params,
  global,
  column,
  methodName,
  methodParams,
}: getProcessedDataProps) {
  const { data: _rawData } = await executeTask(sourceId, Methods.FEATURES_RAW, params);
  const  data = await executeExternalMethod({data: _rawData, column, methodName, params: methodParams})
  return data;
}
