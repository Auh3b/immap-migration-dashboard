import { expose } from 'comlink';
import { METHOD_NAMES } from './methodName';
import {
  getDateRange,
  getHistoricalEngagementBySource,
  getKeywords,
  getMediaAggregateIndicators,
  getMediaData,
  getMediaOrigins,
  getSentimentHistory,
  getSentimentPercentages,
  getTemporalFilterValues,
  getTopPhrases,
  getTopPosts,
  setMediaData,
} from './mediaWorkerMethods';
import { MediaParams } from './mediaUtils';

const methodMap = new Map<string, Function>([
  [METHOD_NAMES.SET_MEDIA_DATA, setMediaData],
  [METHOD_NAMES.GET_MEDIA_DATA, getMediaData],
  [METHOD_NAMES.MEDIA_AGGREGATES, getMediaAggregateIndicators],
  [METHOD_NAMES.MEDIA_ORIGINS, getMediaOrigins],
  [METHOD_NAMES.MEDIA_SENTIMENT_HISTORY, getSentimentHistory],
  [METHOD_NAMES.MEDIA_SENTIMENT_PERCENTAGES, getSentimentPercentages],
  [METHOD_NAMES.MEDIA_TOP_PHRASES, getTopPhrases],
  [METHOD_NAMES.MEDIA_ENGAGEMENT_HISTORY, getHistoricalEngagementBySource],
  [METHOD_NAMES.MEDIA_TOP_POSTS, getTopPosts],
  [METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES, getTemporalFilterValues],
  [METHOD_NAMES.GET_DATE_RANGE, getDateRange],
  [METHOD_NAMES.GET_KEYWORDS, getKeywords],
]);

function runTransform(methodName: string, params: Partial<MediaParams>) {
  try {
    let result: any = null;
    let method = methodMap.get(methodName);
    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }
    result = method(params);
    return { result: result === undefined ? true : result };
  } catch (error) {
    return { error: String(error) };
  }
}

expose({ runTransform });
