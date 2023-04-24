import { executeSQL } from '@carto/react-api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearIntroFilters } from 'store/introSlice';
import { RootState } from 'store/store';

function useFetchData() {
  const [premiseData, setPremiseData] = useState(null);
  const [auroraData, setAuroraData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const credentials = useSelector(
    (state: RootState) => state.carto.credentials,
  );
  const fetchPremise = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.Premise_22032023',
      opts: {
        format: 'json',
      },
    });
    return result;
  };
  const fetchAurora = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.LACRO_Marzo_2023',
      opts: {
        format: 'json',
      },
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

export function useClearIntroFilters(){
  const dispatch = useDispatch()
  
  const filters = useIntroFilters()
  
  const hasFilters = useMemo(()=>{
    return Object.keys(filters).length > 0
  },[dispatch, filters])
  
  console.log(hasFilters)

  const clearAllIntroFilters = () =>{
      dispatch(clearIntroFilters())
  }

  return {
    hasFilters,
    clearAllIntroFilters
  }
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
