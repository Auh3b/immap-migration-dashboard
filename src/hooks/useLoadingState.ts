import { ROUTE_PATHS } from 'routes';
import useGetPathname from './useGetPathname';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const pageMap = {
  [ROUTE_PATHS.INTRODUCTION]: 'intro',
  [ROUTE_PATHS.PREMISE_SERVICE]: 'carto',
  [ROUTE_PATHS.SERVICIO_FEEDBACK_2]: 'carto',
  [ROUTE_PATHS.SERVICES]: 'carto',
  [ROUTE_PATHS.MIGRATION_FLOW]: 'carto',
  [ROUTE_PATHS.DINÁMICA_AURORA]: 'carto',
  [ROUTE_PATHS.MEDIA]: 'media',
};

const getStoreReadyLookUp = (store, state) => {
  switch (store) {
    case 'carto': {
      return state.carto.isFeaturesReady;
    }
    case 'media': {
      return state.media.isMediaDataReady;
    }
    case 'intro': {
      return state.intro.isIntroDataReady;
    }
  }
};

const checkReadyState = (readyStates: boolean | boolean[]) => {
  if (typeof readyStates === 'boolean') {
    return readyStates;
  }

  for (let i; i < readyStates.length; i++) {
    if (!i) return i;
  }

  return true;
};

export default function useLoadingState() {
  const [isReady, setIsReady] = useState(false);
  const location = useGetPathname();
  const currentStore = useMemo(() => pageMap[location], [location]);
  const state = useSelector((state) => state);
  const readyStates = useMemo(
    () => getStoreReadyLookUp(currentStore, state),
    [currentStore, state],
  );

  useEffect(() => {
    setIsReady(checkReadyState(readyStates));
    return () => {
      setIsReady(false);
    };
  }, [readyStates]);
  return {
    isReady,
  };
}
