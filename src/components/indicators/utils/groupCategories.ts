import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { defaultFilterFunction } from './miscelleniousFunctions';
import { descending } from 'd3';

export default function groupCategories(
  input: any[],
  column: string,
  params?: Record<string, any>,
){
  if(!input.length){
    return [];
  }

  const groups = groupByValue({
    input: defaultFilterFunction(input, column, params),
    keyColumn: column,
    valueColumn: column,
    type: GroupByTypes.COUNT
  });
  
  console.log(groups)
  
  if (groups) {
    //@ts-ignore
    return groups.sort((a, b) => descending(a.value, b.value));
  }

}
