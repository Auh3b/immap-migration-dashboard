import { StateSlices } from 'utils/types';
import mainSource from 'data/sources/mainSource';
//@ts-ignore
import { fetchLayerData, FORMATS } from '@deck.gl/carto';
import executeExternalMethod from 'utils/methods/executeExternalMethod';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { useEffect, useState } from 'react';
import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import { FilterTypes } from 'utils/filterFunctions';

const id = 'fecha_filtro';
const column = 'timeunix';
const source = mainSource.id;
const type = FilterTypes.BETWEEN;
const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

const fetchAurora = async () => {
  const { data: result } = await fetchLayerData({
    source: mainSource.data,
    type: mainSource.type,
    connection: mainSource.connection,
    format: FORMATS.JSON,
  });
  return result;
};

export default function MigrationStrictFilters() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
    fetchAurora()
      .then((rawData) =>
        executeExternalMethod({ data: rawData, methodName, column }),
      )
      .then((processedData) => setData(processedData))
      .finally(() => setIsLoading(false));
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, []);
  return (
    <StrictDateFilter
      id={id}
      column={column}
      isLoading={isLoading}
      source={source}
      type={type}
      data={data}
      stateSlice={StateSlices.CARTO}
    />
  );
}
