import MethodFunc from './methodType';
import stackCategoryTotals from './stackCategoryTotals';

/**
 * Return an array of object  to populate a stacked bar chart
 */
const stackedGroupCategoriesAlt2: MethodFunc<any[]> = (
  input: any[],
  column: string,
  methodParams?: Record<string, unknown>,
) => {
  //@ts-ignore
  const { aidTypes, labels, valueColumn } = methodParams;
  //@ts-ignore
  const values: any[] = input.map((d) => ({
    //@ts-ignore
    key: aidTypes.get(d[column]) ?? d[column],
    //@ts-ignore
    value: labels.get(d[valueColumn]),
  }));

  const output = stackCategoryTotals({
    input: values,
    labels,
  });

  return output;
};

export default stackedGroupCategoriesAlt2;
