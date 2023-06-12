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
  source,
}: {
  id: string;
  methodName: string;
  source: string;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters) || {};
  const sourceFilters = useIndicatorFilters({ id, source, filters });
  //@ts-ignore
  const isMediaDataReady = useSelector((state) => state.media.isMediaDataReady);

  const params = useMemo(
    () => ({
      filters: sourceFilters,
    }),
    [filters],
  );

  useCustomCompareEffectAlt(
    () => {
      setIsLoading(true);
      let isCancelled = false;
      if (isMediaDataReady) {
        executeMethod(methodName, params)
          .then((data) => {
            if (!isCancelled) {
              console.log(isCancelled);
              setData(data);
            }
          })
          .catch((error) => {
            dispatch(setError(error.message));
          })
          .finally(() => setIsLoading(false));
        return () => {
          isCancelled = true;
          // setIsLoading can clause Memory leak issues/errors
          setIsLoading(false)
        };
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
