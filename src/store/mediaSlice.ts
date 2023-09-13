//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

interface MediaSlice {
  isMediaDataReady: boolean;
  filters: Record<string, unknown>;
  viewMode: number;
  views: null | string[];
}

const slice = createSlice({
  name: 'media',
  initialState: {
    isMediaDataReady: false,
    filters: {},
    viewMode: 0,
  },
  reducers: {
    setIsMediaDataReady: (state, action) => {
      const { loadingState } = action.payload;
      state.isMediaDataReady = loadingState;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      if (!action.payload) state.views = null;
    },
    addMediaFilter: (state, action) => {
      const { owner, source } = action.payload;
      const dataSource = state.filters[source];
      if (!dataSource) {
        state.filters[source] = {};
        if (!state.filters[source][owner]) {
          state.filters[source][owner] = {};
        }
      }
      state.filters[source][owner] = { ...action.payload };
    },
    removeMediaFilter: (state, action) => {
      const { owner, source } = action.payload;
      const dataSource = state.filters[source];
      if (dataSource) {
        if (dataSource[owner]) {
          delete dataSource[owner];
        }
      }
    },
    clearMediaFilters: (state, action) => {
      state.filters = {};
    },
  },
});

export default slice.reducer;

export const addMediaFilter = (payload: any) => ({
  type: 'media/addMediaFilter',
  payload,
});
export const setViewMode = (payload: number) => ({
  type: 'media/setViewMode',
  payload,
});
export const setViews = (payload: string) => ({
  type: 'media/setViews',
  payload,
});
export const removeMediaFilter = (payload: any) => ({
  type: 'media/removeMediaFilter',
  payload,
});
export const clearMediaFilters = () => ({
  type: 'media/clearMediaFilters',
});
export const setIsMediaDataReady = (payload: any) => ({
  type: 'media/setIsMediaDataReady',
  payload,
});

export const getViewMode = (state: MediaSlice) => {
  return state.viewMode;
};
