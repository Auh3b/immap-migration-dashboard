import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import { useEffect, useMemo, useState } from 'react';
import { FilterTypes } from 'utils/filterFunctions';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { StateSlices } from 'utils/types';
import useFeedbackSource, {
  SERVICE_FEEDBACK_V2_SOURCE_ID,
} from 'data/sources/serviceFeedbackV2Source';
import useFeedbackNnaSource, {
  SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
} from 'data/sources/serviceFeedbackNnaV2Source';
import { Grid } from '@material-ui/core';
//@ts-ignore
import { fetchLayerData, FORMATS } from '@deck.gl/carto';
import executeExternalMethod from 'utils/methods/executeExternalMethod';
import { useSelector } from 'react-redux';
import useComparativeWidgetFilter from 'components/common/customWidgets/hooks/useComparativeWidgetFilter';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { dequal } from 'dequal';

const fetchData = async (phaseSource: {
  data: string;
  type: string;
  connection: string;
}) => {
  const { data: result } = await fetchLayerData({
    source: phaseSource.data,
    type: phaseSource.type,
    connection: phaseSource.connection,
    format: FORMATS.JSON,
    headers: {
      'cache-control': 'max-age=300',
    },
  });
  return result;
};

export default function ServiceStrictDateFilter() {
  const [[adultData, childData], setData] = useState<any[]>([null, null]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const column = 'timeunix';
  const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const getAdultSource = useFeedbackSource();
  const adultSource = useMemo(() => getAdultSource(phase), [phase]);
  const getChildSource = useFeedbackSource();
  const childSource = useMemo(() => getChildSource(phase), [phase]);

  useCustomCompareEffectAlt(
    () => {
      const fetchAdult = fetchData(adultSource);
      const fetchChild = fetchData(childSource);

      Promise.all([fetchAdult, fetchChild])
        .then(([_adultData, _childData]) => {
          return Promise.all([
            executeExternalMethod({ data: _adultData, methodName, column }),
            executeExternalMethod({ data: _childData, methodName, column }),
          ]);
        })
        .then(([processedAdult, processedChild]) => {
          setData([processedAdult, processedChild]);
        });
      return () => {
        setData([null, null]);
        setIsLoading(false);
      };
    },
    [adultSource, childSource],
    dequal,
  );
  return (
    <Grid item>
      <AdultStrictDateFilter data={adultData} isLoading={isLoading} />
      <ChildStrictDateFilter data={childData} isLoading={isLoading} />
    </Grid>
  );
}

function AdultStrictDateFilter({
  data,
  isLoading,
}: {
  data: Record<string, any>;
  isLoading: boolean;
}) {
  const source = SERVICE_FEEDBACK_V2_SOURCE_ID;
  const id = 'fecha_filtro_-_push_adulto';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;
  return (
    <>
      <StrictDateFilter
        id={id}
        isLoading={isLoading}
        column={column}
        source={source}
        type={type}
        data={data}
        stateSlice={StateSlices.CARTO}
      />
    </>
  );
}

function ChildStrictDateFilter({
  data,
  isLoading,
}: {
  data: Record<string, any>;
  isLoading: boolean;
}) {
  const source = SERVICE_FEEDBACK_NNA_V2_SOURCE_ID;
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
