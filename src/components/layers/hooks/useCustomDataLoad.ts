//@ts-nocheck
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useGeojsonFeatures from './useGeojsonFeatures';

export default function useCustomDataLoad({
  source,
  uniqueIdProperty = '',
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250,
}) {
  const viewport = useSelector((state: RootState) => state.carto.viewport);
  const spatialFilter = useSelector((state: RootState) =>
    selectSpatialFilter(state, source?.id),
  );

  const [onDataLoadForGeojson] = useGeojsonFeatures({
    source,
    viewport,
    spatialFilter,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout,
  });
  const onDataLoad = useCallback(
    (data) => {
      return onDataLoadForGeojson(data);
    },
    [onDataLoadForGeojson],
  );

  return [onDataLoad];
}
