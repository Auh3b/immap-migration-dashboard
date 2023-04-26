//@ts-nocheck
import { useEffect, useState } from 'react';
import { fetchLayerData } from '@deck.gl/carto';

interface dataSource {
  id: string;
  type: string;
  connection: string;
  data: string;
}

interface UseFetchLayerDataProps {
  source: dataSource[] | dataSource;
  format?: 'json' | 'geojson';
}

export default function useFetchLayerData({
  source,
  format = 'json',
}: UseFetchLayerDataProps) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (source.length) {
    setIsLoading((prev) => !prev);
    useEffect(() => {
      (function () {
        Promise.all(
          source.map(({ data: source, type, connection }: dataSource) => {
            return fetchLayerData({
              source,
              type,
              connection,
              format,
            });
          }),
        )
          .then(([]) => {
            setData(data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading((prev) => !prev);
          });
      })();
    }, []);
  } else {
    setIsLoading((prev) => !prev);
    useEffect(() => {
      (function () {
        fetchLayerData({
          ...source,
          source: source.data,
          format,
        })
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading((prev) => !prev);
          });
      })();
    }, []);
  }

  return {
    data,
    isLoading,
  };
}
