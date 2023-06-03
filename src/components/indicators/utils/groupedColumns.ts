import MethodFunc from './methodType';
import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { defaultFilterFunction } from './miscelleniousFunctions';
import aggregateColumns from './AggregateColumns';

const groupedColumns: MethodFunc<any[]> = (input, column, params) => {
  try {
    const { columns, aggregateType, legend } = params;
    let name: any[] = legend;
    let value = aggregateColumns(input, column, params).map(({value})=>value)
    console.log(value)

    const output: any = [
      {
        value,
        name,
        legend,
        color: ['#1CABE2',  '#F26A21','#FFC20E'],
      },
    ];
    return output;
  } catch (error) {
    return [];
  }
};

export default groupedColumns;
