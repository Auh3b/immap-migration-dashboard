import { expose } from 'comlink';
import { METHOD_NAMES } from './methodName';
import {
  getHistoricalEngagementBySource,
  getMediaAggregateIndicators,
  getMediaData,
  getMediaOrigins,
  getSentimentHistory,
  getSentimentPercentages,
  getTopPhrases,
  setMediaData,
} from './mediaWorkerMethods';
import { Params } from 'react-router-dom';

const methodMap = new Map<string, Function>([
  [METHOD_NAMES.SET_MEDIA_DATA, setMediaData],
  [METHOD_NAMES.GET_MEDIA_DATA, getMediaData],
  [METHOD_NAMES.MEDIA_AGGREGATES, getMediaAggregateIndicators],
  [METHOD_NAMES.MEDIA_ORIGINS, getMediaOrigins],
  [METHOD_NAMES.MEDIA_SENTIMENT_HISTORY, getSentimentHistory],
  [METHOD_NAMES.MEDIA_SENTIMENT_PERCENTAGES, getSentimentPercentages],
  [METHOD_NAMES.MEDIA_TOP_PHRASES, getTopPhrases],
  [METHOD_NAMES.MEDIA_ENGAGEMENT_HISTORY, getHistoricalEngagementBySource],
]);

function runTransform(methodName: string, params: Partial<Params>) {
  try {
    let result: any = null;
    let method = methodMap.get(methodName);
    if (!method) {
      throw new Error(`Invalid web worker name: ${methodName}`);
    }
    result = method(params);
    return { result: result === undefined ? true : result };
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

expose({ runTransform });
