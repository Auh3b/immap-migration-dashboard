import { executeSQL } from '@carto/react-api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FeatureCollection } from 'geojson';

interface useExecuteQueryProps {
  query: string;
  format: string;
}

export default function useExecuteQuery({
  query,
  format,
}: useExecuteQueryProps) {
  const [data, setData] = useState<null | FeatureCollection | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { credentials } = useSelector((state: RootState) => state.carto);

  async function fetchDataWithQuery() {
    const result = await executeSQL({
      credentials,
      query,
      connection: 'carto_dw',
      opts: {
        format,
      },
    });
    setData(result);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchDataWithQuery();
    setIsLoading(false);
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, []);

  return {
    data,
    isLoading,
  };
}
