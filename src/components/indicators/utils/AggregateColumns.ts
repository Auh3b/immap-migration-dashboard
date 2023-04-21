import { AggregationTypes, aggregationFunctions } from '@carto/react-core';
import { defaultFilterFunction } from './miscelleniousFunctions';

export default function aggregateColumns(
  input: any[],
  columns: string[],
  aggregateType: AggregationTypes = AggregationTypes.SUM,
): number {
  let totalValue: number = 0;
  const aggFn = aggregationFunctions[aggregateType];
  columns.forEach((column) => {
    const filteredData = defaultFilterFunction(input, column);
    //@ts-expect-error
    const columnTotal = aggFn(filteredData, [column]);
    //@ts-expect-error
    totalValue += columnTotal;
  });

  return totalValue;
}
