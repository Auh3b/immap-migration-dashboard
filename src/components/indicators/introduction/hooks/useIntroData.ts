import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'store/appSlice';
import { dequal } from 'dequal';
import useIndicatorFilters from 'components/indicators/media/hooks/useIndicatorFilters';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import executeIntroMethod from '../utils/executeIntroMethod';

export default function useIntroData({
  id,
  column,
  methodName,
  methodParams,
  source,
}: {
  id: string;
  methodName: string;
  column: string;
  source: string;
  methodParams?: any;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  //@ts-ignore
  const filters = useSelector((state) => state.intro.filters) || {};
  const sourceFilters = useIndicatorFilters({ id, source, filters });
  //@ts-ignore
  const isMediaDataReady = useSelector((state) => state.intro.isIntroDataReady);

  const params = useMemo(
    () => ({
      filters: sourceFilters,
      ...methodParams,
    }),
    [filters, sourceFilters],
  );

  useCustomCompareEffectAlt(
    () => {
      setIsLoading(true);
      if (isMediaDataReady) {
        executeIntroMethod({
          source,
          column,
          params,
          methodName,
        })
          .then((data) => {
            if (data.length) {
              setData(data);
            }
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
