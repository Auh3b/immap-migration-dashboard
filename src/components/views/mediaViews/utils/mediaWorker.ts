import { expose } from 'comlink';
import { METHOD_NAMES } from './methodName';
import {
  getMediaAggregateIndicators,
  getMediaOrigins,
  getSentimentHistory,
  getSentimentPercentages,
  getTopPhrases,
} from './methods';
import { Filters, filterValues } from 'utils/filterFunctions';

const funcMap = new Map([
  [METHOD_NAMES.MEDIA_AGGREGATES, getMediaAggregateIndicators],
  [METHOD_NAMES.MEDIA_ORIGINS, getMediaOrigins],
  [METHOD_NAMES.MEDIA_SENTIMENT_HISTORY, getSentimentHistory],
  [METHOD_NAMES.MEDIA_SENTIMENT_PERCENTAGES, getSentimentPercentages],
  [METHOD_NAMES.MEDIA_TOP_PHRASES, getTopPhrases],
]);

let mediaData: any[];
let filters: Filters;

function setMediaData(data: any) {
  mediaData = data;
}

function getMediaData() {
  if (mediaData) {
    return mediaData;
  }
}

function setFilters() {}

function applyFiltersToData(filters: Filters) {
  if (!mediaData) {
    return [];
  }

  if (!filters) {
    return mediaData;
  }

  const filteredData = filterValues(mediaData, filters);

  return filteredData;
}

function runTransform(funcName: string) {
  if (mediaData) {
    const execute = funcMap.get(funcName);
    const results = execute(mediaData);
    return results;
  }

  return [];
}

expose({ setMediaData, getMediaData, runTransform });
