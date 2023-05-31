import { max, mean, min, rollup, sum } from 'd3';

export enum GroupByTypes{
  SUM = 'sum',
  AVG = 'avg',
  MAX = 'max',
  MIN = 'min',
  COUNT = 'count'
}

const GROUP_FUNCTION = new Map<string, Function>([
  [GroupByTypes.SUM, (data:any[], column:string) => sum(data, d=> d[column])],
  [GroupByTypes.AVG,  (data:any[], column:string) => mean(data, d=> d[column])],
  [GroupByTypes.COUNT,  (data:any[], column:string) => data.length],
  [GroupByTypes.MAX,  (data:any[], column:string) => max(data, d=> d[column])],
  [GroupByTypes.MIN,  (data:any[], column:string) => min(data, d=> d[column])],
])


function groupByValue({
  input,
  keyColumn,
  valueColumn,
  type = GroupByTypes.COUNT,
}: {
  input: any[];
  keyColumn: string;
  valueColumn: string;
  type?: GroupByTypes
}) {
  const outputMap = rollup(
    input,
    (v) => GROUP_FUNCTION.get(type)(v, valueColumn),
    (d) => d[keyColumn],
  );
  const output = Array.from(outputMap).map(([name, value]) => ({
    name,
    value,
  }));
  return output;
}

export default groupByValue;
