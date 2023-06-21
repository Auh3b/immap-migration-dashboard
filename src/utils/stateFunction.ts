import { addFilter, clearFilters, removeFilter } from '@carto/react-redux';
import { StateSlices } from './types';
import {
  addMediaFilter,
  clearMediaFilters,
  removeMediaFilter,
} from 'store/mediaSlice';
import {
  addIntroFilter,
  clearIntroFilters,
  removeIntroFilter,
} from 'store/introSlice';

type StateFunctionMap = Record<StateSlices, Function>;

export const removeFilterFunction: StateFunctionMap = Object.fromEntries([
  [StateSlices.CARTO, removeFilter],
  [StateSlices.MEDIA, removeMediaFilter],
  [StateSlices.INTRO, removeIntroFilter],
]);

export const addFilterFunction: StateFunctionMap = Object.fromEntries([
  [StateSlices.CARTO, addFilter],
  [StateSlices.MEDIA, addMediaFilter],
  [StateSlices.INTRO, addIntroFilter],
]);

export const clearFilterFuncion: StateFunctionMap = Object.fromEntries([
  [StateSlices.CARTO, clearFilters],
  [StateSlices.MEDIA, clearMediaFilters],
  [StateSlices.INTRO, clearIntroFilters],
]);
