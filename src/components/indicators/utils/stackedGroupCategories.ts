import { rollup } from 'd3';

/**
 * Return an array of object  to populate a stacked bar chart
 */
const stackedGroupCategories = (
  input: any[],
  column: string,
  methodParams?: Record<string, unknown>,
) => {
  //@ts-ignore
  const { aidTypes, labels, valueColumn } = methodParams;
  const values: any[] = [];
  for (let f of input) {
    //@ts-ignore
    const value = f[valueColumn].split(',');
    const key = f[column].split(',');

    for (let i = 0; i < key.length; i++) {
      if (value[i]) {
        values.push({
          //@ts-ignore
          key: aidTypes.get(+key[i]),
          //@ts-ignore
          value: +value[i] === 999999 ? labels.get(0) : labels.get(+value[i]),
        });
      } else {
        values.push({
          //@ts-ignore
          key: aidTypes.get(+key[i]),
          //@ts-ignore
          value: labels.get(0),
        });
      }
    }
  }

  const groups = rollup(
    values,
    (v) => v.length,
    (d) => d.value,
    (d) => d.key,
  );

  return Array.from(groups);
};

export default stackedGroupCategories;
