import MethodFunc from './methodType';
import aggregateColumns from './AggregateColumns';
import { AggregationTypes } from '@carto/react-core';

const getAverageElapsedDays: MethodFunc = (input, column) => {
  const averageDays = aggregateColumns(input, [column], AggregationTypes.AVG);
  return averageDays;
};

export default getAverageElapsedDays
