//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'media',
  initialState: {
    filters: {},
  },
  reducers: {
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
export const removeMediaFilter = (payload: any) => ({
  type: 'media/removeMediaFilter',
  payload,
});
export const clearMediaFilters = () => ({
  type: 'media/clearMediaFilters',
});
