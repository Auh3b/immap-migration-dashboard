import {
  AggregationTypes,
  GroupByFeature,
  groupValuesByColumn,
} from '@carto/react-core';
import { defaultFilterFunction } from './miscelleniousFunctions';
import { descending } from 'd3';

export default function groupCategories(
  input: any[],
  column: string,
  params?: Record<string, any>,
): GroupByFeature | [] {
  const groups = groupValuesByColumn({
    //@ts-ignore
    data: defaultFilterFunction(input, column, params),
    keysColumn: column,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });
  if (groups) {
    //@ts-ignore
    return groups.sort((a, b) => descending(a.value, b.value));
  }

  return [];
}
