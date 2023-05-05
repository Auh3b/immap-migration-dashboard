import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'map',
  initialState: {
    pageInfo: {},
    transition: null,
  },
  reducers: {
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload;
    },
    removePageInfo: (state) => {
      state.pageInfo = {};
    },
    setTransition: (state, action) => {
      state.transition = action.payload;
    },
    removeTransition: (state, action) => {
      state.transition = null;
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

export const setTransition = (payload: number) => ({
  type: 'map/setTransition',
  payload,
});

export const removeTransition = () => ({
  type: 'map/removeTransition',
});
