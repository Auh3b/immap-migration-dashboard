import { groupValuesByColumn } from '@carto/react-core';
import MethodFunc from './methodType';

const groupedColumns: MethodFunc = (input, column, params) => {
  const { columns, aggregateType, legend } = params;
  let value: any[] = [];
  let name: any[] = legend;
  for (let i = 0; i < columns.length; i++) {
    const target_column = columns[i];
    const target_value = groupValuesByColumn({
      data: input.filter((d) => +d[target_column] !== 999999),
      valuesColumns: [target_column],
      operation: aggregateType,
    }).map((d) => d.value);
    value = [...value, ...target_value];
  }

  const output: any = [
    {
      value,
      name,
      legend,
    },
  ];
  return output;
};

export default groupedColumns;
