import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'map',
  initialState: {
    ref: null,
  },
  reducers: {
    setMapRef: (state, action) => {
      state.ref = action.payload;
    },
  },
});

export default slice.reducer;

export const setMapRef = (payload: any) => ({
  type: 'app/SetMapRef',
  payload,
});
