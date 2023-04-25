import { rollup } from 'd3';

const stackedGroupCategoriesAlt = (
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

  const _groups = Array.from(
    rollup(
      values,
      (v) => v.length,
      (d) => d.key,
      (d) => d.value,
    ),
  );

  let groups: any[] = [];

  for (let [name, valueMap] of _groups) {
    let newValue: any[] = [['name', name]];
    let total = 0;
    //@ts-ignore
    Array.from(labels).forEach(([key, value]) => {
      newValue = [...newValue, [value, valueMap.get(value) ?? 0]];
      total += valueMap.get(value) ?? 0;
    });
    newValue = newValue.map(([key, value], index) => {
      if (index === 0) {
        return [key, value];
      }
      return [key, value / total];
    });
    groups = [...groups, Object.fromEntries(newValue)];
  }

  return groups;
};

export default stackedGroupCategoriesAlt;
