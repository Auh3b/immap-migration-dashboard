import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'map',
  initialState: {
    pageInfo: {},
  },
  reducers: {
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload;
    },
    removePageInfo: (state) => {
      state.pageInfo = {};
    },
  },
});

export default slice.reducer;

export const setPageInfo = (payload: any) => ({
  type: 'map/setPageInfo',
  payload,
});

export const removePageInfo = () => ({
  type: 'map/removePageInfo',
});
