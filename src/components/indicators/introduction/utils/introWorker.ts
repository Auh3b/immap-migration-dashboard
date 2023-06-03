import aggregateColumns from 'components/indicators/utils/AggregateColumns';
import concatenatedValues from 'components/indicators/utils/concatenatedValues';
import groupCategories from 'components/indicators/utils/groupCategories';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { expose } from 'comlink';
import { Filters, filterValues } from 'utils/filterFunctions';
import stackedBarCategories from 'components/indicators/utils/stackedBarCategories';
import groupedColumns from 'components/indicators/utils/groupedColumns';

const methodMap = new Map<string, Function>([
  [EXTERNAL_METHOD_NAMES.SET_DATA, setData],
  [EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS, aggregateColumns],
  [EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES, concatenatedValues],
  [EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES, groupCategories],
  [EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES, stackedBarCategories],
  [EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS, groupedColumns],
]);

let currentData: Record<string, any[]>;

function executeMethod({ source, methodName, column, params }: any) {
  try {
    let result: any[] = [];
    let method = methodMap.get(methodName);

    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }

    if (methodName === EXTERNAL_METHOD_NAMES.SET_DATA) {
      result = method({ params });
      return { result: result === undefined ? true : result };
    }

    const input = getData(source, params);

    if (input.length) {
      result = method(input, column, params);
      return { result: result === undefined ? true : result };
    }

    return { result: false };
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

expose({ executeMethod });

function setData({ params }: any) {
  if (params?.data) {
    currentData = params?.data;
    return true;
  }
  return false;
}

function getData(source: string, params: any) {
  if (!currentData) {
    return [];
  }
  if (!currentData[source]) {
    return [];
  }

  let result = currentData[source];

  if (params.filters) {
    result = applyFiltersToData(result, params.filters);
  }

  return result;
}

function applyFiltersToData(data: any[], filters: Filters) {
  if (Object.keys(filters).length === 0) {
    return data;
  }

  const filteredData = filterValues(data, filters);
  return filteredData;
}
