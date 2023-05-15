//@ts-nocheck
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import getTileFeatures from 'utils/methods/getTileFeatures';
import useCustomCompareEffect from '../../../../hooks/useCustomCompareEffect';
import { dequal } from 'dequal';
import useWidgetSource from './useWidgetSource';
import MethodFunc from 'components/indicators/utils/methodType';
import { defaultFilterFunction } from 'components/indicators/utils/miscelleniousFunctions';

export interface useWidgetFetchProps {
  id: string;
  dataSource: any;
  column?: string;
  method?: MethodFunc | null;
  methodParams?: {};
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
  method = (input, column) => input,
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
        getTileFeatures({
          sourceId: source.id,
          params,
          global,
        })
          .then((data) => {
            if (data && data.length > 0) {
              setData(
                method(
                  [...defaultFilterFunction(data, column)],
                  column,
                  methodParams,
                ),
              );
            } else {
              setData([]);
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
