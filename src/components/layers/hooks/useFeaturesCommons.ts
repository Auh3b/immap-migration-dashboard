//@ts-nocheck
import { useDispatch } from 'react-redux';
import { setFeaturesReady } from '@carto/react-redux';
import { useState, useRef, useCallback, useMemo } from 'react';

export default function useFeaturesCommons({ source }) {
  const dispatch = useDispatch();

  const [isDataLoaded, setDataLoaded] = useState(false);
  const debounceIdRef = useRef(null);

  useMemo(() => {
    if (!source) {
      setDataLoaded(false);
    }
  }, [source?.id]);

  const clearDebounce = useCallback(() => {
    if (debounceIdRef.current) {
      clearTimeout(debounceIdRef.current);
    }
    debounceIdRef.current = null;
  }, []);

  const stopAnyCompute = useCallback(() => {
    clearDebounce();
    setDataLoaded(false);
  }, [clearDebounce, setDataLoaded]);

  const sourceId = source?.id;

  const setSourceFeaturesReady = useCallback(
    (ready) => {
      if (sourceId) {
        dispatch(setFeaturesReady({ sourceId, ready }));
      }
    },
    [dispatch, sourceId],
  );

  return [
    debounceIdRef,
    isDataLoaded,
    setDataLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceFeaturesReady,
  ];
}
