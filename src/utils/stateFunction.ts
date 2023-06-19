import { addFilter, removeFilter } from '@carto/react-redux';
import { StateSlices } from './types';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';

export const removeFilterFunction: Record<StateSlices, Function> =
  Object.fromEntries([
    [StateSlices.CARTO, removeFilter],
    [StateSlices.MEDIA, removeMediaFilter],
    [StateSlices.INTRO, removeIntroFilter],
  ]);
export const addFilterFunction: Record<StateSlices, Function> =
  Object.fromEntries([
    [StateSlices.CARTO, addFilter],
    [StateSlices.MEDIA, addMediaFilter],
    [StateSlices.INTRO, addIntroFilter],
  ]);
