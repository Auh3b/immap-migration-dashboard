//@ts-nocheck
import { TILE_FORMATS } from '@deck.gl/carto';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import getTileFeatures from 'utils/methods/getTileFeatures';

interface Method {
  (input: any[], column: string): any[];
}

interface useWidgetFetchProps {
  layerId: string;
  column?: string;
  source: any;
  method?: Method | null;
}

export default function useWidgetFetch({
  method = (input) => input,
  column,
  source,
}: useWidgetFetchProps) {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const [data, setData] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function executeWidgetFetch() {
    try {
      setIsLoading(true);
      const tileData = await getTileFeatures({
        sourceId: source.id,
        params: {
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
      setIsLoading(false);
    }
  }

  useMemo(() => {
    executeWidgetFetch();
    setIsLoading(false);
    return () => {
      setData(null);
      setIsLoading(false);
      setError(false);
    };
  }, [viewport, source]);

  return { data, isLoading, error };
}
