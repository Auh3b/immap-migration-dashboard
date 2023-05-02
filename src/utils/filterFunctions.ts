import { _FilterTypes } from '@carto/react-core';

export type filterId = string | number;
export type filterValue = string | number;
export type filterField = string | number;
export type filterType = _FilterTypes;

export interface filterItem {
  id: filterId;
  value: filterValue;
  field: filterField;
  type: filterType;
}

function filterIn(field: string | number, value: number | string) {
  return (d: any) => d[field] === value;
}

function filterSearch(field: string | number, value: string) {
  return (d: any) => {
    const dataValue = d[field] as string;
    const startIndex = dataValue.search(value);

    if (startIndex === -1) {
      return false;
    }

    return true;
  };
}

export function filterFunctions(type: filterType) {
  const filterMap = new Map([
    [_FilterTypes.IN, filterIn],
    [_FilterTypes.STRING_SEARCH, filterSearch],
  ]);
  return filterMap.get(type);
}

export function filterValues(
  data: any[],
  _filters: Record<string, filterItem>,
) {
  if (data.length === 0) {
    return data;
  }

  const filters = Object.values(_filters);

  if (filters.length === 0) {
    return data;
  }

  let output: any[] = data;

  for (let { value, field, type } of filters) {
    output = output.filter(filterFunctions(type)(field, value));
  }

  return output;
}
