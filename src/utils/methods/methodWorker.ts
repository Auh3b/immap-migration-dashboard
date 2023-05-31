import { expose } from 'comlink';
import { EXTERNAL_METHOD_NAMES } from './methods';
// import aggregateColumns from 'components/indicators/utils/AggregateColumns';
import concatenatedValues from 'components/indicators/utils/concatenatedValues';
// import getHierarchy from 'components/indicators/utils/getHierarchy';
// import histogramValues from 'components/indicators/utils/histogramValues';
// import groupedColumns from 'components/indicators/utils/groupedColumns';
import groupCategories from 'components/indicators/utils/groupCategories';
// import singleStackBarValues from 'components/indicators/utils/singleStackBarValues';
// import stackCategoryTotals from 'components/indicators/utils/stackCategoryTotals';
// import stackedBarCategories from 'components/indicators/utils/stackedBarCategories';
// import stackedGroupCategories from 'components/indicators/utils/stackedGroupCategories';
// import stackedGroupCategoriesAlt from 'components/indicators/utils/stackedGroupCategoryAlt';
import stackedGroupCategoriesAlt2 from 'components/indicators/utils/stackedGroupCategoriesAlt2';
// import timelineValues from 'components/indicators/utils/timelineValues';
import getConnectDotServices from 'components/indicators/utils/getConnectDotServices';
// import getServiceAvailability from 'components/indicators/utils/getServiceAvailability';
// import getSunburstHierarchy from 'components/indicators/utils/getSunburstHierarchy';
// import getAverageElapsedDays from 'components/indicators/utils/getAverageElapsedDays';
// import getAvgDaysByCountry from 'components/indicators/utils/getAvgDaysByCountry';
// import timelineValueAlt from 'components/indicators/utils/timelineValueAlt';

const methodMap = new Map<string, Function>([
  // [EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS, aggregateColumns],
  [EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES, concatenatedValues],
  // [EXTERNAL_METHOD_NAMES.GET_HIERARCHY, getHierarchy],
  // [EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS, groupedColumns],
  [EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES, groupCategories],
  // [EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES, histogramValues],
  // [EXTERNAL_METHOD_NAMES.SINGLE_STACK_BAR_VALUES, singleStackBarValues],
  // [EXTERNAL_METHOD_NAMES.STACK_CATEGORY_TOTALS, stackCategoryTotals],
  // [EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES, stackedBarCategories],
  // [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES, stackedGroupCategories],
  // [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT, stackedGroupCategoriesAlt],
  [EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2, stackedGroupCategoriesAlt2],
  // [EXTERNAL_METHOD_NAMES.TIMELINE_VALUES, timelineValues],
  [EXTERNAL_METHOD_NAMES.GET_CONNECTED_DOT_SERVICES, getConnectDotServices],
  // [EXTERNAL_METHOD_NAMES.GET_SERVICE_AVAILABILITY, getServiceAvailability],
  // [EXTERNAL_METHOD_NAMES.GET_AVERAGE_ELAPSED_DAYS, getAverageElapsedDays],
  // [EXTERNAL_METHOD_NAMES.GET_AVG_DAYS_BY_COUNTRY, getAvgDaysByCountry],
  // [EXTERNAL_METHOD_NAMES.GET_SUNBURST_HIERARCHY, getSunburstHierarchy],
  // [EXTERNAL_METHOD_NAMES.TIMELINE_VALUES_ALT, timelineValueAlt],
]);

function executeMethod({ input, methodName, column, params }: any):any {
  try {
    if(!methodName){
     throw new Error(`no web worker name`);
    }
    
    let result: any[] = [];
    let method = methodMap.get(methodName);
    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }
    result = method(input, column, params);
    return { result: result === undefined ? true : result };
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

expose({ executeMethod });
