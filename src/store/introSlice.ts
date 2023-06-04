//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'intro',
  initialState: {
    isIntroDataReady: false,
    filters: {},
  },
  reducers: {
    setIsIntroDataReady: (state, action) => {
      state.isIntroDataReady = action.payload;
    },
    addIntroFilter: (state, action) => {
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
    removeIntroFilter: (state, action) => {
      const { owner, source } = action.payload;
      const dataSource = state.filters[source];
      if (dataSource) {
        if (dataSource[owner]) {
          delete dataSource[owner];
        }
      }
    },
    clearIntroFilters: (state, action) => {
      state.filters = {};
    },
  },
});

export default slice.reducer;

export const setIsIntroDataReady = (payload: Boolean) => ({
  type: 'intro/setIsIntroDataReady',
  payload,
});
export const addIntroFilter = (payload: any) => ({
  type: 'intro/addIntroFilter',
  payload,
});
export const removeIntroFilter = (payload: any) => ({
  type: 'intro/removeIntroFilter',
  payload,
});
export const clearIntroFilters = () => ({
  type: 'intro/clearIntroFilters',
});
