import aggregateColumns from 'components/indicators/utils/AggregateColumns';
import concatenatedValues from 'components/indicators/utils/concatenatedValues';
import getHierarchy from 'components/indicators/utils/getHierarchy';
import histogramValues from 'components/indicators/utils/histogramValues';
import groupedColumns from 'components/indicators/utils/groupedColumns';
import groupCategories from 'components/indicators/utils/groupCategories';
import singleStackBarValues from 'components/indicators/utils/singleStackBarValues';
import stackCategoryTotals from 'components/indicators/utils/stackCategoryTotals';
import stackedBarCategories from 'components/indicators/utils/stackedBarCategories';
import stackedGroupCategories from 'components/indicators/utils/stackedGroupCategories';
import stackedGroupCategoriesAlt from 'components/indicators/utils/stackedGroupCategoryAlt';
import stackedGroupCategoriesAlt2 from 'components/indicators/utils/stackedGroupCategoriesAlt2';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { expose } from 'comlink';

const methodMap = new Map<string, Function>([
  [EXTERNAL_METHOD_NAMES.SET_DATA, setData],
  [EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS, aggregateColumns],
  [EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES, concatenatedValues],
  [EXTERNAL_METHOD_NAMES.GET_HIERARCHY, getHierarchy],
  [EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS, groupedColumns],
  [EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES, groupCategories],
  [EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES, histogramValues],
  [EXTERNAL_METHOD_NAMES.SINGLE_STACK_BAR_VALUES, singleStackBarValues],
  [EXTERNAL_METHOD_NAMES.STACK_CATEGORY_TOTALS, stackCategoryTotals],
  [EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES, stackedBarCategories],
  [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES, stackedGroupCategories],
  [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT, stackedGroupCategoriesAlt],
  [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2, stackedGroupCategoriesAlt2],
]);

let currentData: Record<string, any[]>;

function executeMethod({ methodName, params }: any) {
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

    const input = getData({ params });

    if (input.length) {
      result = method({ input, params });
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

function getData({ params }: any) {
  if (!currentData) {
    return [];
  }
  if (params?.dataSource) {
    return [];
  }
  return currentData[params?.dataSource] || [];
}
