import {
  AggregationTypes,
  GroupByFeature,
  groupValuesByColumn,
} from '@carto/react-core';

export default function groupCategories(
  input: any[],
  column: string,
): GroupByFeature | [] {
  const groups = groupValuesByColumn({
    data: input,
    keysColumn: column,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });

  if (groups) {
    return groups;
  }

  return [];
}
