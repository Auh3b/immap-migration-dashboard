import { AggregationTypes, groupValuesByDateColumn } from '@carto/react-core';
import MethodFunc from './methodType';

/**
 * Return an array of object  to populate a timeline chart
 */
const timelineValues: MethodFunc<any[]> = (input, column, params) => {
  const { stepSize } = params;
  const groups = groupValuesByDateColumn({
    data: input,
    valuesColumns: [column],
    keysColumn: column,
    groupType: stepSize,
    operation: AggregationTypes.COUNT,
  });
  return groups;
};

export default timelineValues;
