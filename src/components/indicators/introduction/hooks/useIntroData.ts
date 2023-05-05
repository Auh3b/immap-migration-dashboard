import { executeSQL } from '@carto/react-api';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearIntroFilters } from 'store/introSlice';
import { RootState } from 'store/store';
//@ts-ignore
import {fetchLayerData, FORMATS} from '@deck.gl/carto'
import premiseSource from 'data/sources/premiseSource'
import mainSource from 'data/sources/mainSource'

function useFetchData() {
  const [premiseData, setPremiseData] = useState(null);
  const [auroraData, setAuroraData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const credentials = useSelector(
    (state: RootState) => state.carto.credentials,
  );
  console.log(credentials)
  const fetchPremise = async () => {
    const { data: result } = await fetchLayerData({
      source: premiseSource.data,
      type: premiseSource.type,
      connection: premiseSource.connection,
      format: FORMATS.JSON,
    });
    return result;
  };
  const fetchAurora = async () => {
    const { data: result } = await fetchLayerData({
      source: mainSource.data,
      type: mainSource.type,
      connection: mainSource.connection,
      format: FORMATS.JSON,
    });
    return result;
  };
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchAurora(), fetchPremise()])
      .then(([aurora, premise]) => {
        setAuroraData(aurora);
        setPremiseData(premise);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));

    return () => {
      setAuroraData(null);
      setPremiseData(null);
      setError(null);
      setIsLoading(false);
    };
  }, []);
  return {
    auroraData,
    premiseData,
    isLoading,
    error,
  };
}

export function useIntroFilters() {
  //@ts-ignore
  const introFilters = useSelector((state) => state.intro.filters);
  return introFilters;
}

export function useClearIntroFilters() {
  const dispatch = useDispatch();

  const filters = useIntroFilters();

  const hasFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [dispatch, filters]);

  const clearAllIntroFilters = () => {
    dispatch(clearIntroFilters());
  };

  return {
    hasFilters,
    clearAllIntroFilters,
  };
}

function useFilteredData(input: any[], filters: any) {
  const filteredData = useMemo(() => {
    let data: any[] = input;

    if (data && filters) {
      let _filters = Object.entries(filters);

      //@ts-ignore
      for (let [chartId, { column, values }] of _filters) {
        data = data.filter((d) => d[column] === values[0]);
      }
      return data;
    }
    return data;
  }, [input, filters]);

  return filteredData;
}

export default function useIntroData() {
  const { auroraData: auroraFilters, premiseData: premiseFilters } =
    useIntroFilters();
  const {
    auroraData: _auroraData,
    premiseData: _premiseData,
    isLoading,
    error,
  } = useFetchData();
  const auroraData = useFilteredData(_auroraData, auroraFilters);
  const premiseData = useFilteredData(_premiseData, premiseFilters);
  return {
    auroraFilters,
    auroraData,
    premiseData,
    isLoading,
    error,
  };
}
