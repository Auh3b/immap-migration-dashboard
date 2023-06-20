import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import { useEffect, useState } from 'react';
import { FilterTypes } from 'utils/filterFunctions';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { StateSlices } from 'utils/types';
import serviceFeedbackV2Source from 'data/sources/serviceFeedbackV2Source';
import serviceFeedbackNnaV2Source from 'data/sources/serviceFeedbackNnaV2Source';
import { Grid } from '@material-ui/core';
//@ts-ignore
import { fetchLayerData, FORMATS } from '@deck.gl/carto';
import executeExternalMethod from 'utils/methods/executeExternalMethod';

const fetchChild = async () => {
  const { data: result } = await fetchLayerData({
    source: serviceFeedbackNnaV2Source.data,
    type: serviceFeedbackNnaV2Source.type,
    connection: serviceFeedbackNnaV2Source.connection,
    format: FORMATS.JSON,
  });
  return result;
};

const fetchAdult = async () => {
  const { data: result } = await fetchLayerData({
    source: serviceFeedbackV2Source.data,
    type: serviceFeedbackV2Source.type,
    connection: serviceFeedbackV2Source.connection,
    format: FORMATS.JSON,
  });
  return result;
};

export default function ServiceStrictDateFilter() {
  const [[adultData, childData], setData] = useState<any[]>([null, null]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const column = 'timeunix';
  const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

  useEffect(() => {
    Promise.all([fetchAdult(), fetchChild()])
    .then(([_adultData, _childData])=>{
      return Promise.all([
        executeExternalMethod({data: _adultData, methodName, column}),
        executeExternalMethod({data: _childData, methodName, column})
      ]) 
    }).then(([processedAdult, processedChild])=>{
      console.log(processedAdult, processedChild)
      setData([processedAdult, processedChild])
    })
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, []);
  return (
    <Grid item>
      <AdultStrictDateFilter data={adultData} isLoading={isLoading} />
      <ChildStrictDateFilter data={childData} isLoading={isLoading} />
    </Grid>
  );
}

function AdultStrictDateFilter({
  data, isLoading
}:{
  data: Record<string, any>;
  isLoading: boolean;
}) {
  const source = serviceFeedbackV2Source.id;
  const id = 'fecha_filtro_-_push_adulto';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;
  return (
    <>
      {data && !isLoading ? (
        <StrictDateFilter
          id={id}
          column={column}
          source={source}
          type={type}
          data={data}
          stateSlice={StateSlices.CARTO}
        />
      ) : null}
    </>
  );
}

function ChildStrictDateFilter({
  data, isLoading
}:{
  data: Record<string, any>;
  isLoading: boolean;
}) {
  const source = serviceFeedbackNnaV2Source.id;
  const id = 'fecha_filtro_-_push_nna';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;

  return (
    <>
      {data && !isLoading ? (
        <StrictDateFilter
          id={id}
          column={column}
          source={source}
          type={type}
          data={data}
          stateSlice={StateSlices.CARTO}
        />
      ) : null}
    </>
  );
}
