import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import MethodFunc from 'components/indicators/utils/methodType';
import { ascending } from 'd3';
import { UNICEF_COLORS } from 'theme';

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
    //@ts-ignore
    const _group_column_values = group_column_values.sort((a,b)=> ascending(a.name, b.name))
    valueUnique = [
      ...valueUnique,
      ..._group_column_values.map(({ name }) => name),
    ];
    valueGroup = [...valueGroup, _group_column_values.map(({ value }) => value)];
  }

  valueUnique = Array.from(new Set(valueUnique));
  const output = [
    {
      name: valueUnique,
      value: valueGroup,
      legend,
      color: [UNICEF_COLORS[0], UNICEF_COLORS[4], UNICEF_COLORS[3]],
    },
  ];
  console.log(input, output)
  return output;
};

export default stackedBarCategories;
