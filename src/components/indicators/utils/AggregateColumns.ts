import { median, sum } from 'd3';
import MethodFunc from './methodType';
import { defaultFilterFunction } from './miscelleniousFunctions';

export enum SummarisationTypes {
  SUM = 'sum',
  AVG = 'avg',
  MIN = 'min',
  MAX = 'max',
  COUNT = 'count',
}

interface AggCol {
  name: string;
  type: SummarisationTypes;
}

type Columns = AggCol[];

const SUMMARIZATION_METHOD = Object.fromEntries([
  [
    SummarisationTypes.SUM,
    (input: any[], column: string) => sum(input, (d) => d[column]),
  ],
  [
    SummarisationTypes.AVG,
    (input: any[], column: string) => median(input, (d) => d[column]),
  ],
  [SummarisationTypes.COUNT, (input: any[], column: string) => input.length],
]);

/**
 * Aggregate columns or field based on summarization type
 *
 */
const aggregateColumns: MethodFunc<any[]> = (input, column, params) => {
  if (!input.length) return [];

  const columns: Columns = params.columns;

  let output: any[] = [];

  for (let i = 0; i < columns.length; i++) {
    const { name, type } = columns[i];
    const value = SUMMARIZATION_METHOD[type](
      defaultFilterFunction(input, name),
      name,
    );
    output = [...output, { name, value }];
  }

  return output;
};

export default aggregateColumns;
