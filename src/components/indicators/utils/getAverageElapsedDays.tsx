import MethodFunc from './methodType';
import { mean } from 'd3';

const getAverageElapsedDays: MethodFunc<number> = (input, column) => {
  const averageDays = mean(input, d => d[column])
  return averageDays;
};

export default getAverageElapsedDays
