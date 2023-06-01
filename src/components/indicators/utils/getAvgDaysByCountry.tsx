import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import MethodFunc from './methodType';

const getAvgDaysByCountry: MethodFunc<{ name: string; value: number }[]> = (
  input,
  column,
  params,
) => {
  const { valueColumn } = params;
  const output = groupByValue({
    input,
    keyColumn: column,
    valueColumn: valueColumn,
    type: GroupByTypes.AVG,
  });

  return output;
};

export default getAvgDaysByCountry;
