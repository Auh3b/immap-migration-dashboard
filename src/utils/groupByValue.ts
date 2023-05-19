import { rollup, sum } from 'd3';

function groupByValue({
  input,
  keyColumn,
  valueColumn,
}: {
  input: any[];
  keyColumn: string;
  valueColumn: string;
}) {
  const outputMap = rollup(
    input,
    (v) => sum(v, (d) => d[valueColumn]),
    (d) => d[keyColumn],
  );
  const output = Array.from(outputMap).map(([name, value]) => ({
    name,
    value,
  }));
  return output;
}

export default groupByValue;
