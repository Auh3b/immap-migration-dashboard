import { configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { Action, Reducer, ReducersMapObject, Store } from 'redux';
import appSlice from './appSlice';
import mapSlice from './mapSlice';
import introSlice from './introSlice';
import reduceReducers from 'reduce-reducers';

interface AppStore extends Store {
  asyncReducers: ReducersMapObject;
  injectReducer: (key: string, reducer: Reducer) => void;
}

export const setCustomViewport: Reducer = (state, action) => {
  if (action.type === 'SET_CUSTOM_VIEWPORT') {
    console.log(action.payload);
    state = {
      ...state,
      carto: {
        ...state.carto,
        viewport: action.payload,
      },
    };
  }
  return state;
};

// Define the Reducers that will always be present in the application
const staticReducers = {
  app: appSlice,
  map: mapSlice,
  intro: introSlice,
};

let store: AppStore = {
  ...configureStore({
    reducer: staticReducers,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
      getCustomMiddleware(getDefaultMiddleware),
  }),
  asyncReducers: {},
  injectReducer: (key: string, asyncReducer: Reducer) => {
    store.asyncReducers[key] = asyncReducer;
    const reducer = createReducer(store.asyncReducers);
    const rootReducer = reduceReducers(reducer, setCustomViewport);
    store.replaceReducer(rootReducer);
  },
};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

function getCustomMiddleware(
  getDefaultMiddleware: CurriedGetDefaultMiddleware,
) {
  const devConfig = {
    immutableCheck: {
      ignoredPaths: ['carto.viewportFeatures'],
    },
    serializableCheck: {
      ignoredPaths: ['carto.viewportFeatures'],
      ignoredActions: ['carto/setViewportFeatures'],
    },
  };

  const prodConfig = {
    immutableCheck: false,
    serializableCheck: false,
  };

  const isProductionEnv = process.env.NODE_ENV === 'production';

  return getDefaultMiddleware(isProductionEnv ? prodConfig : devConfig);
}

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
