import { AggregationTypes, aggregationFunctions } from '@carto/react-core';
import MethodFunc from 'components/indicators/utils/methodType';
import { UNICEF_COLORS } from 'theme';

/**
 * Return an array of object  to populate a stacked bar chart
 */
const singleStackBarValues: MethodFunc<any[]> = (input, column, params) => {
  const { columns, legend, aggregationType = AggregationTypes.SUM } = params;
  let name = [legend];
  let value: [number][] = [];
  for (let i = 0; i < columns.length; i++) {
    const target_column = columns[i];
    const column_value = aggregationFunctions[aggregationType](
      input.filter((d) => +d[target_column] !== 999999),
      target_column,
    );
    value = [...value, [column_value]];
  }

  const output = [
    {
      name,
      value,
      legend,
      //@ts-ignore
      color: [UNICEF_COLORS[0], UNICEF_COLORS[4], UNICEF_COLORS[3]],
    },
  ];
  return output;
};

export default singleStackBarValues;
