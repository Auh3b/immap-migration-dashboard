export default function histogramValues(input: any[], column: string) {
  const target = input.map((i: any) => ({value: i[column]}));
  if (target) {
    return target;
  }
  return [];
};
