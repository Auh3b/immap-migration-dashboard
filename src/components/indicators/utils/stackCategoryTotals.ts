import { descending, rollup } from 'd3';

/**
 * Return an array of object  to populate a stacked category chart
 */
export default function stackCategoryTotals({
  input,
  labels,
}: {
  input: { key: string; value: string }[];
  labels: any;
}) {
  const _groups = Array.from(
    rollup(
      input,
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
  return groups.sort((a, b) => descending(a.name, b.name));
}
