import { ViewState, setViewState } from '@carto/react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { removeTransition, setTransition } from 'store/mapSlice';

export default function handleMapTransitions({
  start,
  end,
  params,
  dispatch,
}: {
  start: number;
  end: number;
  params: Partial<ViewState>;
  dispatch: Dispatch;
}) {
  dispatch(setTransition(start));
  //@ts-ignore
  dispatch(setViewState(params));
  setTimeout(() => dispatch(removeTransition()), end);
}
