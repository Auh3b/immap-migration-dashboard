//@ts-nocheck
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useCustomCompareEffect from '../../../../hooks/useCustomCompareEffect';
import { dequal } from 'dequal';
import useWidgetSource from './useWidgetSource';
import getProcessedData from 'utils/getProcessedData';

export interface useWidgetFetchProps {
  id: string;
  dataSource: any;
  column?: string;
  methodName?: string;
  methodParams?: Record<string, any>;
  global?: Boolean;
}

/**
 * This functions is used for retreaving data from loaded map datasets to used by
 * custom widgets. This mimicks how data is fetched with by carto standard
 * widgets. Though is not as performat as the original since part of the data
 * modification is done sychronosly as oppose to using multiple threads
 */

export default function useWidgetFetch({
  id,
  methodName,
  column,
  dataSource,
  methodParams = {},
  global = false,
}: useWidgetFetchProps) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource),
  );

  const source = useWidgetSource({
    dataSource,
    id,
  });

  const params = useMemo(
    () => ({
      filters: source?.filters,
      filtersLogicalOperator: source?.filtersLogicalOperator,
      limit: null,
      global,
    }),
    [source],
  );

  useCustomCompareEffect(
    () => {
      setIsLoading(true);
      if (source && isSourceReady) {
        getProcessedData({
          sourceId: source.id,
          params,
          methodName,
          column,
          methodParams,
          global,
        })
          .then((data) => {
            if (data) {
              setData(data);
            }
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [params, isSourceReady, source],
    dequal,
  );

  return { data, isLoading, error };
}
