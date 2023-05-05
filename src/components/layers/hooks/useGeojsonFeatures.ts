//@ts-nocheck
import { Methods, executeTask } from '@carto/react-workers';
import { useCallback, useEffect } from 'react';
import useFeaturesCommons from './useFeaturesCommons';
import { debounce } from '@carto/react-core';

function throwError(error: Error) {
  if (error.name === 'DataCloneError')
    throw new Error(
      `DataCloneError: Unable to retrieve GeoJSON features. Please check that your query is returning a column called "geom" or that you are using the geoColumn property to indicate the geometry column in the table.`,
    );
  if (error.name === 'AbortError') return;
  throw error;
}

export default function useGeojsonFeatures({
  source,
  viewport,
  spatialFilter,
  uniqueIdProperty,
  debounceTimeout = 250,
}) {
  const [
    debounceIdRef,
    isGeoJsonLoaded,
    setGeoJsonLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceFeaturesReady,
  ] = useFeaturesCommons({ source });

  const sourceId = source?.id;

  const computeFeatures = useCallback(
    ({ viewport, spatialFilter, uniqueIdProperty }) => {
      executeTask(sourceId, Methods.GEOJSON_FEATURES, {
        viewport,
        geometry: spatialFilter,
        uniqueIdProperty,
      })
        .then(() => {
          setSourceFeaturesReady(true);
        })
        .catch(throwError);
    },
    [setSourceFeaturesReady, sourceId],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedComputeFeatures = useCallback(
    debounce(computeFeatures, debounceTimeout),
    [computeFeatures],
  );

  useEffect(() => {
    if (sourceId && isGeoJsonLoaded) {
      clearDebounce();
      setSourceFeaturesReady(false);
      debounceIdRef.current = debouncedComputeFeatures({
        viewport,
        spatialFilter,
        uniqueIdProperty,
      });
    }
  }, [
    viewport,
    spatialFilter,
    uniqueIdProperty,
    sourceId,
    isGeoJsonLoaded,
    debouncedComputeFeatures,
    setSourceFeaturesReady,
    clearDebounce,
    debounceIdRef,
  ]);

  const onDataLoad = useCallback(
    (geojson) => {
      stopAnyCompute();
      setSourceFeaturesReady(false);
      executeTask(sourceId, Methods.LOAD_GEOJSON_FEATURES, { geojson })
        .then(() => setGeoJsonLoaded(true))
        .catch(throwError);
    },
    [sourceId, setSourceFeaturesReady, stopAnyCompute, setGeoJsonLoaded],
  );

  return [onDataLoad];
}
