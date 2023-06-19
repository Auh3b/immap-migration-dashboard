import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterTypes } from 'utils/filterFunctions';
import executeMethod from 'components/indicators/media/hooks/executeMethod';
import { METHOD_NAMES } from '../utils/methodName';
import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import { StateSlices } from 'utils/types';

export default function MediaStrictDataFilter() {
  const source = 'meltwater';
  const id = 'fecha_filtro';
  const column = 'date';
  const type = FilterTypes.BETWEEN;
  const methodName = METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;
  //@ts-ignore
  const isMediaDataReady = useSelector((state) => state.media.isMediaDataReady);
  const [data, setData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isMediaDataReady) {
      executeMethod(methodName, {})
        .then((data) => setData(data))
        .finally(() => setIsLoading(false));
    }
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [isMediaDataReady]);

  return (
    <>
      {data && !isLoading ? (
        <StrictDateFilter
          id={id}
          column={column}
          source={source}
          type={type}
          data={data}
          stateSlice={StateSlices.MEDIA}
        />
      ) : null}
    </>
  );
}
