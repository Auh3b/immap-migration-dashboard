import MethodFunc from 'components/indicators/utils/methodType';
import { ascending } from 'd3';
import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { defaultFilterFunction } from './miscelleniousFunctions';

const stackedBarCategories: MethodFunc<any[]> = (input, column, params) => {
  try {
    const { columns, legend, aggType } = params;
    let valueGroup: any = [];
    let valueUnique: string[] = [];
    for (let i = 0; i < columns.length; i++) {
      const target_column = columns[i];
      const group_column_values = groupByValue({
        input: defaultFilterFunction(input, target_column),
        valueColumn: target_column,
        keyColumn: target_column,
        type: aggType || GroupByTypes.COUNT,
      });
      const _group_column_values = group_column_values.sort((a, b) =>
        //@ts-ignore
        ascending(a.name, b.name),
      );
      valueUnique = [
        ...valueUnique,
        ..._group_column_values.map(({ name }) => name),
      ];
      valueGroup = [
        ...valueGroup,
        _group_column_values.map(({ value }) => value),
      ];
    }

    valueUnique = Array.from(new Set(valueUnique));
    const output = [
      {
        name: valueUnique,
        value: valueGroup,
        legend,
        color: ['#1CABE2', '#F26A21', '#FFC20E'],
      },
    ];
    return output;
  } catch (error) {
    return [];
  }
};

export default stackedBarCategories;
