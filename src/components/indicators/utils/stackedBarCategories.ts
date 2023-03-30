import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import MethodFunc from 'components/indicators/utils/methodType';

const stackedBarCategories: MethodFunc = (input, column, params) => {
  const { columns, legend } = params;
  let valueGroup: any = [];
  let valueUnique: string[] = [];
  for (let i = 0; i < columns.length; i++) {
    const target_column = columns[i];
    const group_column_values = groupValuesByColumn({
      data: input.filter((d) => +d[target_column] !== 999999),
      valuesColumns: [target_column],
      keysColumn: target_column,
      operation: AggregationTypes.COUNT,
    });
    valueUnique = [
      ...valueUnique,
      ...group_column_values.map(({ name }) => name),
    ];
    valueGroup = [...valueGroup, group_column_values.map(({ value }) => value)];
  }

  valueUnique = Array.from(new Set(valueUnique));
  const output = [
    {
      name: valueUnique,
      value: valueGroup,
      legend,
    },
  ];
  return output;
};

export default stackedBarCategories;
