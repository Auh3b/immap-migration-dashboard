import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import MethodFunc from './methodType';
import { descending, rollup } from 'd3';
import stackCategoryTotals from './stackCategoryTotals';

const stackedGroupCategoriesAlt2: MethodFunc = (
  input: any[],
  column: string,
  methodParams?: Record<string, unknown>,
) => {
  //@ts-ignore
  const { aidTypes, labels, valueColumn } = methodParams;
  //@ts-ignore
  const values: any[] = input.map((d) => ({
    //@ts-ignore
    key: aidTypes.get(d[column]),
    //@ts-ignore
    value: labels.get(d[valueColumn]),
  }));

  const output = stackCategoryTotals({
    input: values,
    labels
  })

  return output;
};

export default stackedGroupCategoriesAlt2;
