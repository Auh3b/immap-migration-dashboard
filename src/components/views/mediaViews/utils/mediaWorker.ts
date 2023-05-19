import { expose } from 'comlink';
import { METHOD_NAMES } from './methodName';
import {
  getMediaAggregateIndicators,
  getMediaOrigins,
  getSentimentHistory,
  getSentimentPercentages,
  getTopPhrases,
} from './mediaWorkerMethods';
import { Filters, filterValues } from 'utils/filterFunctions';

const funcMap = new Map([
  [METHOD_NAMES.MEDIA_AGGREGATES, getMediaAggregateIndicators],
  [METHOD_NAMES.MEDIA_ORIGINS, getMediaOrigins],
  [METHOD_NAMES.MEDIA_SENTIMENT_HISTORY, getSentimentHistory],
  [METHOD_NAMES.MEDIA_SENTIMENT_PERCENTAGES, getSentimentPercentages],
  [METHOD_NAMES.MEDIA_TOP_PHRASES, getTopPhrases],
]);

interface Params {
  filters: Filters;
}

let mediaData: any;
let currentfilters: Filters;

function setMediaData(data: any) {
  mediaData = data;
}

function getMediaData() {
  if (mediaData) {
    return mediaData;
  }
}

function setFilters(filters: Filters) {
  if (Object.keys(filters).length > 0) {
    currentfilters = filters;
  }
}

function applyFiltersToData(filters: Filters) {
  if (!mediaData) {
    return [];
  }

  if (Object.keys(filters).length === 0) {
    return mediaData;
  }

  const filteredData = filterValues(mediaData.sources, filters);
  return { ...mediaData, sources: filteredData };
}

function runTransform(funcName: string, params: Partial<Params>) {
  const { filters } = params;
  if (mediaData) {
    const filteredData = applyFiltersToData(filters);
    const execute = funcMap.get(funcName);
    const results = execute(filteredData);
    return results;
  }

  return [];
}

expose({ setMediaData, getMediaData, runTransform, setFilters });
