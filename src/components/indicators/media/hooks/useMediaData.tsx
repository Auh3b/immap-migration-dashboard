import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import executeMethod from './executeMethod';
import { setError } from 'store/appSlice';
import { dequal } from 'dequal';
import useCustomCompareEffectAlt from './useCustomCompareEffectAlt';
import useIndicatorFilters from './useIndicatorFilters';

export default function useMediaData({
  id,
  methodName,
}: {
  id: string;
  methodName: string;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const filters = useIndicatorFilters({id})
  //@ts-ignore
  const isMediaDataReady = useSelector((state) => state.media.isMediaDataReady);

  const params = useMemo(
    () => ({
      filters,
    }),
    [filters],
  );

  useCustomCompareEffectAlt(
    () => {
      setIsLoading(true);
      if (isMediaDataReady) {
        executeMethod(methodName, params)
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            dispatch(setError(error.message));
          })
          .finally(() => setIsLoading(false));
      }
    },
    [params, isMediaDataReady, dispatch],
    dequal,
  );

  return {
    data,
    isLoading,
  };
}
