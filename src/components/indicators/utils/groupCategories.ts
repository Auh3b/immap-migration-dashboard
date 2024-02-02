import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { defaultFilterFunction } from './miscelleniousFunctions';
import { ascending, descending } from 'd3';

export enum Sort_Type {
  ASC = 'asc',
  DESC = 'desc',
}

const SORT_FUNCTION = Object.fromEntries([
  [Sort_Type.ASC, ascending],
  [Sort_Type.DESC, descending],
]);

/**
 * return an array of objects which has grouped values of single column
 */
export default function groupCategories(
  input: any[],
  column: string,
  params?: Record<string, any>,
) {
  if (!input.length) {
    return [];
  }

  const sort = SORT_FUNCTION[params?.sortType] || SORT_FUNCTION[Sort_Type.DESC];

  const groups = groupByValue({
    input: defaultFilterFunction(input, column, params),
    keyColumn: column,
    valueColumn: column,
    type: GroupByTypes.COUNT,
  });

  if (groups) {
    //@ts-ignore
    return groups.sort((a, b) => sort(a.value, b.value));
  }
}
