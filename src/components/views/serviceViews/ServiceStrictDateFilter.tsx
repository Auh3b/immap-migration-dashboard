import StrictDateFilter from "components/common/dataFilters/strictDataFilter/Index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterTypes } from "utils/filterFunctions";
import getProcessedData from "utils/getProcessedData";
import { EXTERNAL_METHOD_NAMES } from "utils/methods/methods";
import { StateSlices } from "utils/types";
import serviceFeedbackV2Source from 'data/sources/serviceFeedbackV2Source'
import { Grid } from "@material-ui/core";
import { selectAreFeaturesReadyForSource } from "@carto/react-redux";

export default function ServiceStrictDateFilter() {
  return (
    <Grid item>
      <AdultStrictDateFilter />
    </Grid>
  )
}

function AdultStrictDateFilter() {
  const source = serviceFeedbackV2Source.id;
  const id = 'fecha_filtro_-_push_adulto';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;
  const params = {}
  const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;
  //@ts-ignore
  const isSourceReady = useSelector(
    (state) => selectAreFeaturesReadyForSource(state, source),
  );
  const [data, setData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (isSourceReady) {
      getProcessedData({
        sourceId: source,
        column,
        methodName
      })
        .then((data) => setData(data))
        .finally(() => setIsLoading(false));
    }
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [isSourceReady]);

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