import { descending } from 'd3';
import MethodFunc from './methodType';
import groupByValue, { GroupByTypes } from 'utils/groupByValue';

const concatenatedValues:MethodFunc<any[]> = (input, column, params) => {
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

  const groupData = groupByValue({
    input: pivotedData,
    valueColumn: column,
    keyColumn: column,
    type: GroupByTypes.COUNT
  });
  //@ts-ignore
  return groupData.sort((a, b) => descending(a.value, b.value));
}

export default concatenatedValues;
