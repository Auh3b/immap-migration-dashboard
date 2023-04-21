import {
  AggregationTypes,
  GroupByFeature,
  groupValuesByColumn,
} from '@carto/react-core';
import { defaultFilterFunction } from './miscelleniousFunctions';

export default function groupCategories(
  input: any[],
  column: string,
): GroupByFeature | [] {
  const groups = groupValuesByColumn({
    //@ts-ignore
    data: defaultFilterFunction(input, column),
    keysColumn: column,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });
  if (groups) {
    return groups;
  }

  return [];
}
