//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'intro',
  initialState: {
    filters: {},
  },
  reducers: {
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
  },
});

export default slice.reducer;

console.log(slice);

export const addIntroFilter = (payload: any) => ({
  type: 'intro/addIntroFilter',
  payload,
});
export const removeIntroFilter = (payload: any) => ({
  type: 'intro/removeIntroFilter',
  payload,
});
