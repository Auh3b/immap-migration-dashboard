import { ROUTE_PATHS } from 'routes';
import useGetPathname from './useGetPathname';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StateSlices } from 'utils/types';

const getStoreReadyLookUp = (store, state) => {
  console.log(state[store]);
  switch (store) {
    case StateSlices.CARTO: {
      return Object.values(state.carto.featuresReady) || [];
    }
    case StateSlices.MEDIA: {
      return state.media.isMediaDataReady;
    }
    case StateSlices.INTRO: {
      return state.intro.isIntroDataReady;
    }
  }
};

const checkReadyState = (readyStates: boolean | boolean[]) => {
  console.log(readyStates);
  if (!readyStates) return false;
  if (typeof readyStates === 'boolean') {
    return readyStates;
  }

  if (!readyStates.length) return false;

  for (let i = 0; i < readyStates.length; i++) {
    if (!readyStates[i]) return readyStates[i];
  }

  return true;
};

export default function useLoadingState() {
  const [isReady, setIsReady] = useState(false);
  const pageRef = useRef<string>();

  const pageMap = {
    ['inicio']: 'intro',
    [ROUTE_PATHS.PREMISE_SERVICE]: 'carto',
    [ROUTE_PATHS.SERVICIO_FEEDBACK_2]: 'carto',
    [ROUTE_PATHS.SERVICES]: 'carto',
    [ROUTE_PATHS.MIGRATION_FLOW]: 'carto',
    [ROUTE_PATHS.DINÁMICA_AURORA]: 'carto',
    [ROUTE_PATHS.MEDIA]: 'media',
  };

  const location = useGetPathname();
  const currentStore = useMemo(() => pageMap[location], [location]);
  const state = useSelector((state) => state);
  const readyStates = useMemo(
    () => getStoreReadyLookUp(currentStore, state),
    [currentStore, state],
  );

  useEffect(() => {
    pageRef.current = location;
  }, [location]);

  useEffect(() => {
    setIsReady(checkReadyState(readyStates));
    return () => {
      setIsReady(false);
    };
  }, [readyStates]);
  return {
    isReady,
    page: pageRef.current,
  };
}
