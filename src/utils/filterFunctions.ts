export enum FilterTypes {
  IN = 'in',
  BETWEEN = 'between', // [a, b] both are included
  CLOSED_OPEN = 'closed_open', // [a, b) a is included, b is not
  TIME = 'time',
  STRING_SEARCH = 'stringSearch',
  WORD_CLOUD_IN = 'word_cloud_in'
}

export type filterId = string | number;
export type filterValue = string | number;
export type filterField = string | number;
export type filterType = FilterTypes;

export interface filterItem {
  id: filterId;
  values: filterValue[];
  column: filterField;
  type: filterType;
}

export type Filters = Record<string, filterItem>;

function filterIn(column: string | number, value: number | string) {
  return (d: any) => d[column] === value;
}

function filterSearch(column: string | number, value: string) {
  return (d: any) => {
    const dataValue = d[column] as string;
    const startIndex = dataValue.search(value);

    if (startIndex === -1) {
      return false;
    }

    return true;
  };
}

function filterRange(column: string, value: [number, number]) {
  const [start, end] = value;
  return (d: any) => d[column] >= start && d[column] <= end;
}

function filterWordCloud(column: string, value: string){
  return (d: any) => { 
    const words:string = d[column].map(([word,count]: [string, number]) => word).join(',')
    return words.search(value) === -1 ? false : true
  }
}

export function filterFunctions(type: filterType) {
  const filterMap = new Map<string, Function>([
    [FilterTypes.IN, filterIn],
    [FilterTypes.STRING_SEARCH, filterSearch],
    [FilterTypes.BETWEEN, filterRange],
    [FilterTypes.WORD_CLOUD_IN, filterWordCloud],
  ]);
  return filterMap.get(type);
}

export function filterValues(data: any[], _filters: Filters) {
  if (data.length === 0) {
    return data;
  }

  const filters = Object.values(_filters);

  if (filters.length === 0) {
    return data;
  }

  let output: any[] = data;
  for (let { values, column, type } of filters) {
    output = output.filter(filterFunctions(type)(column, values[0]));
  }

  return output;
}
