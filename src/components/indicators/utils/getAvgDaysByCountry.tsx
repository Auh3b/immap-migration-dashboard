import MethodFunc from './methodType';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';

const getAvgDaysByCountry: MethodFunc = (input, column, params) => {
  const { valueColumn } = params;
  const output = groupValuesByColumn({
    data: input,
    keysColumn: column,
    valuesColumns: [valueColumn],
    operation: AggregationTypes.AVG,
  });

  return output;
};

export default getAvgDaysByCountry
