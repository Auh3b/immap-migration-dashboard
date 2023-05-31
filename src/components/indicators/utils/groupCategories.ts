import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { defaultFilterFunction } from './miscelleniousFunctions';
import { descending } from 'd3';

export default function groupCategories(
  input: any[],
  column: string,
  params?: Record<string, any>,
){
  const groups = groupByValue({
    //@ts-ignore
    data: defaultFilterFunction(input, column, params),
    keysColumn: column,
    valuesColumns: column,
    type: GroupByTypes.COUNT
  });
  if (groups) {
    //@ts-ignore
    return groups.sort((a, b) => descending(a.value, b.value));
  }

  return [];
}
