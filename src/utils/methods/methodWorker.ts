import { expose } from 'comlink';
import { METHOD_NAMES } from './methods';
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
import timelineValues from 'components/indicators/utils/timelineValues';

const methodMap = new Map<string, Function>([
  [METHOD_NAMES.AGGREGATE_COLUMNS, aggregateColumns],
  [METHOD_NAMES.CONCATENATED_VALUES, concatenatedValues],
  [METHOD_NAMES.GET_HIERARCHY, getHierarchy],
  [METHOD_NAMES.GROUPED_COLUMNS, groupedColumns],
  [METHOD_NAMES.GROUP_CATEGORIES, groupCategories],
  [METHOD_NAMES.HISTOGRAM_VALUES, histogramValues],
  [METHOD_NAMES.SINGLE_STACK_BAR_VALUES, singleStackBarValues],
  [METHOD_NAMES.STACK_CATEGORY_TOTALS, stackCategoryTotals],
  [METHOD_NAMES.STACKED_BAR_CATEGORIES, stackedBarCategories],
  [METHOD_NAMES.STACKED_GROUP_CATEGORIES, stackedGroupCategories],
  [METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT, stackedGroupCategoriesAlt],
  [METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2, stackedGroupCategoriesAlt2],
  [METHOD_NAMES.TIMELINE_VALUES, timelineValues],
]);

function executeMethod({ input, methodName, params }: any) {
  try {
    let result: any[] = [];
    let method = methodMap.get(methodName);
    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }
    result = method(input, params);
    return { result: result === undefined ? true : result };
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

expose({ executeMethod });
