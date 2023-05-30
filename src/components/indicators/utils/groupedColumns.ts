import { groupValuesByColumn } from '@carto/react-core';
import MethodFunc from './methodType';
import { UNICEF_COLORS } from 'theme';

const groupedColumns: MethodFunc = (input, column, params) => {
  try {
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
        color: [UNICEF_COLORS[0], UNICEF_COLORS[4], UNICEF_COLORS[3]],
      },
    ];
    return output;
  } catch (error) {
    return []
  }
};

export default groupedColumns;
