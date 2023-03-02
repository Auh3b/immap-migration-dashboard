//@ts-nocheck
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { TILE_FORMATS } from '@deck.gl/carto';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import getTileFeatures from 'utils/methods/getTileFeatures';

export interface WidgetFetchMethod {
  (input: any[], column: string): any[] | null;
}

export interface useWidgetFetchProps {
  source: any;
  column?: string;
  method?: WidgetFetchMethod | null;
}

export default function useWidgetFetch({
  method = (input) => input,
  column,
  source,
}: useWidgetFetchProps) {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const [data, setData] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, source.id),
  );

  async function executeWidgetFetch() {
    if (source && isSourceReady) {
      try {
        const tileData = await getTileFeatures({
          sourceId: source.id,
          params: {
            filters: source.filters,
            filtersLogicalOperator: source.filtersLogicalOperator,
            viewport,
            limit: null,
            tileFormat: TILE_FORMATS.GEOJSON,
          },
        });

        if (method) {
          setData(method(tileData, column));
        } else {
          setData(data);
        }

        return tileData;
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    executeWidgetFetch();
  }, [viewport, source, isSourceReady]);

  return { data, isLoading, error };
}
