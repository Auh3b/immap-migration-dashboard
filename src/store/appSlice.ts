import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null,
    bottomSheetOpen: false,
    showChartModal: false,
    modalUrl: '',
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBottomSheetOpen: (state, action) => {
      state.bottomSheetOpen = action.payload;
    },
    setChartModal: (state, action) => {
      state.showChartModal = action.payload;
    },
    setModalUrl: (state, action) => {
      state.modalUrl = action.payload;
    },
    removeModalUrl: (state) => {
      state.modalUrl = '';
    },
  },
});

export default slice.reducer;

export const setError = (payload: string | null) => ({
  type: 'app/setError',
  payload,
});
export const setBottomSheetOpen = (payload: boolean) => ({
  type: 'app/setBottomSheetOpen',
  payload,
});
export const setChartModal = (payload: boolean) => ({
  type: 'app/setChartModal',
  payload,
});
export const setModalUrl = (payload: string) => ({
  type: 'app/setModalUrl',
  payload,
});
export const removeModalUrl = () => ({
  type: 'app/removeModalUrl',
});
