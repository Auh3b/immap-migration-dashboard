//@ts-nocheck
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { TILE_FORMATS } from '@deck.gl/carto';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import getTileFeatures from 'utils/methods/getTileFeatures';
import useCustomCompareEffect from '../../../../hooks/useCustomCompareEffect';
import { dequal } from 'dequal';
import useWidgetSource from './useWidgetSource';

export interface WidgetFetchMethod {
  (input: any[], column: string): any[] | null;
}

export interface useWidgetFetchProps {
  id: string;
  dataSource: any;
  column?: string;
  method?: WidgetFetchMethod | null;
  global?: boolean;
}

export default function useWidgetFetch({
  id,
  method = (input) => input,
  column,
  dataSource,
  global = false,
}: useWidgetFetchProps) {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const [data, setData] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource),
  );

  const source = useWidgetSource({
    dataSource,
    id,
  });

  const params = {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    viewport,
    limit: null,
    tileFormat: TILE_FORMATS.GEOJSON,
  };

  
  useCustomCompareEffect(
    ()=> {
      setIsLoading(true)
      if (source && isSourceReady) {
        getTileFeatures({
          sourceId: source.id,
          params,
        }).then(data =>{
          setData(method(data.filter(i => +i[column] !== 999999), column))
        }).catch(error =>{
          setError(error)
        }).finally(()=>{
          setIsLoading(false)
        })
      }
    },
    [params, isSourceReady, source],
    dequal,
  );

  return { data, isLoading, error };
}
