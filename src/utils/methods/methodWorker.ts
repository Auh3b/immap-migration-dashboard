import { expose } from 'comlink';
import { EXTERNAL_METHOD_NAMES } from './methods';
import concatenatedValues from 'components/indicators/utils/concatenatedValues';
import histogramValues from 'components/indicators/utils/histogramValues';
import groupCategories from 'components/indicators/utils/groupCategories';
import stackedGroupCategoriesAlt2 from 'components/indicators/utils/stackedGroupCategoriesAlt2';
import getConnectDotServices from 'components/indicators/utils/getConnectDotServices';
import getSunburstHierarchy from 'components/indicators/utils/getSunburstHierarchy';
import getAverageElapsedDays from 'components/indicators/utils/getAverageElapsedDays';
import getAvgDaysByCountry from 'components/indicators/utils/getAvgDaysByCountry';
import timelineValueAlt from 'components/indicators/utils/timelineValueAlt';
import { defaultFilterFunction } from 'components/indicators/utils/miscelleniousFunctions';
import { getTemporalFilters } from 'utils/dateHelpers';

const methodMap = new Map<string, Function>([
  [EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES, concatenatedValues],
  [EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES, groupCategories],
  [EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES, histogramValues],
  [
    EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2,
    stackedGroupCategoriesAlt2,
  ],
  [EXTERNAL_METHOD_NAMES.GET_CONNECTED_DOT_SERVICES, getConnectDotServices],
  [EXTERNAL_METHOD_NAMES.GET_AVERAGE_ELAPSED_DAYS, getAverageElapsedDays],
  [EXTERNAL_METHOD_NAMES.GET_AVG_DAYS_BY_COUNTRY, getAvgDaysByCountry],
  [EXTERNAL_METHOD_NAMES.GET_SUNBURST_HIERARCHY, getSunburstHierarchy],
  [EXTERNAL_METHOD_NAMES.TIMELINE_VALUES_ALT, timelineValueAlt],
  [EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES, getTemporalFilters],
]);

function executeMethod({ input, methodName, column, params }: any): any {
  try {
    if (!methodName) {
      throw new Error(`no web worker name`);
    }
    let result;
    let method = methodMap.get(methodName);
    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }
    result = method(defaultFilterFunction(input, column), column, params);
    return { result: result === undefined ? true : result };
  } catch (error) {
    return { error: String(error) };
  }
}

expose({ executeMethod });
