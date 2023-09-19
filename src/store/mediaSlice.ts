//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

interface MediaSlice {
  isMediaDataReady: boolean;
  filters: Record<string, unknown>;
  viewMode: number;
  views: null | string[];
  viewFilters: null | Record<string, unknown>[];
}

const slice = createSlice({
  name: 'media',
  initialState: {
    isMediaDataReady: false,
    filters: {},
    viewMode: 0,
    views: null,
    viewFilters: null,
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
    setView: (state, action) => {
      const { index, value } = action.payload;
      if (!state.views) {
        state.views = [];
        state.views[index] = value;
      } else {
        state.views[index] = value;
      }
    },
    setViewFilter: (state, action) => {
      const { index, id, value } = action.payload;
      if (!state.viewFilters) {
        state.viewFilters = [];
        state.viewFilters[index] = { [id]: value };
      } else {
        state.viewFilters[index] = { ...state.viewFilters[index], [id]: value };
      }
    },
    removeView: (state, action) => {
      if (!state.views) return;
      const index = action.payload;
      state.views[index] = '';
    },
    clearViews: (state) => {
      state.views = null;
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
    clearMediaFilters: (state) => {
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

export const setView = (payload: { index: number; value: string }) => ({
  type: 'media/setView',
  payload,
});

export const removeView = (payload: number) => ({
  type: 'media/removeView',
  payload,
});

export const clearViews = () => ({
  type: 'media/clearViews',
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

export const setViewFilter = (payload: {
  index: number;
  id: string;
  value: any;
}) => ({
  type: 'media/setViewFilter',
  payload,
});

export const getViewMode = (state: MediaSlice) => {
  return state.viewMode;
};

export const getViewFilter = (state: MediaSlice, index: number) => {
  return state.viewFilters?.[index];
};
