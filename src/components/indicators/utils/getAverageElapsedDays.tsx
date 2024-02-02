import MethodFunc from './methodType';
import { mean } from 'd3';

/**
 * Compute average number of day elapsed
 *
 */
const getAverageElapsedDays: MethodFunc<number> = (input, column) => {
  const averageDays = mean(input, (d) => d[column]);
  return averageDays;
};

export default getAverageElapsedDays;
