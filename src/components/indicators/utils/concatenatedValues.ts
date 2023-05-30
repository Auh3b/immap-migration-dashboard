import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { descending } from 'd3';
import MethodFunc from './methodType';

interface getCategoriesProps {
  data: any[];
  valuesColumns?: string[];
  keysColumn?: string;
  operation?: AggregationTypes;
}

function getCategories({
  data,
  valuesColumns,
  keysColumn,
  operation,
}: getCategoriesProps) {
  return groupValuesByColumn({
    data,
    valuesColumns,
    keysColumn,
    operation,
  });
}

const concatenatedValues:MethodFunc = (input, column, params) => {
  if(!input.length){
    return []
  }
  
  let splitValue:string = ','
  if(params){
    splitValue = params?.splitValue ? params?.splitValue : splitValue
  }
  //@ts-ignore
  const values = input.map((f) => f[column]).filter((i) => i !== 'null');
  const valueString: string = values.join(splitValue);
  const valuesArray: any[] = valueString.split(splitValue).map((i) => i.trim());
  const pivotedData = valuesArray
    .filter((i: string) => i.length > 0)
    .map((i: any) => Object.fromEntries(new Map([[column, i]])));

  const groupData = getCategories({
    data: pivotedData,
    valuesColumns: [column],
    keysColumn: column,
    operation: AggregationTypes.COUNT,
  });
  //@ts-ignore
  return groupData.sort((a, b) => descending(a.value, b.value));
}

export default concatenatedValues;
