import { User } from '@auth0/auth0-react';
import { AlertProps } from '@material-ui/lab';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    error: null,
    bottomSheetOpen: false,
    showChartModal: false,
    modalUrl: '',
    modalDataSource: '',
    isSidePanelOpen: false,
    sidePanelWidth: 348,
    phase: null,
    message: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
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
    setModalDataSource: (state, action) => {
      state.modalDataSource = action.payload;
    },
    removeModalUrl: (state) => {
      state.modalUrl = '';
    },
    setIsSidePanelOpen: (state, action) => {
      state.isSidePanelOpen = action?.payload
        ? action.payload
        : !state.isSidePanelOpen;
    },
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
  },
});

export default slice.reducer;

export const setUser = (payload: User) => ({
  type: 'app/setUser',
  payload,
});
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
export const setModalDataSource = (payload: string) => ({
  type: 'app/setModalDataSource',
  payload,
});
export const removeModalUrl = () => ({
  type: 'app/removeModalUrl',
});
export const setIsSidePanelOpen = (payload?: boolean) => ({
  type: 'app/setIsSidePanelOpen',
  payload,
});
export const setPhase = (payload: number) => ({
  type: 'app/setPhase',
  payload,
});

export const setMessage = (
  payload: { text: string; severity: AlertProps['severity'] } | null,
) => ({
  type: 'app/setMessage',
  payload,
});

export const getUser = (state) => state.app.user;
