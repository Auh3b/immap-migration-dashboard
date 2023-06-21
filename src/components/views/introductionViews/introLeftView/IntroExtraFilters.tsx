import { Divider, Fab, Grid, Typography, makeStyles } from '@material-ui/core';
import { TimeseriesFilter } from 'components/common/dataFilters/TimeseriesFilter';
import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import executeIntroMethod from 'components/indicators/introduction/utils/executeIntroMethod';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterTypes } from 'utils/filterFunctions';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { StateSlices } from 'utils/types';

const source = 'aurora';
export const id = 'fecha_filtro';
const column = 'timeunix';

const useExtraStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
  },
}));

export default function IntroExtraFilters() {
  const classes = useExtraStyles();
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography
        variant='subtitle1'
        style={{
          textTransform: 'uppercase',
          color: '#333333',
          padding: '8px 0px',
        }}
      >
        filtros adicionales
      </Typography>
      {/* <TimeseriesFilter id={id} source={source} column={column} /> */}
      <IntroStrictDateFilter />
    </Grid>
  );
}

function IntroStrictDateFilter() {
  const source = 'aurora';
  const id = 'fecha_filtro';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;
  const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

  //@ts-ignore
  const isIntroDataReady = useSelector((state) => state.intro.isIntroDataReady);
  const [data, setData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isIntroDataReady) {
      executeIntroMethod({
        source,
        methodName,
        column,
      })
        .then((data) => setData(data))
        .finally(() => setIsLoading(false));
    }
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [isIntroDataReady]);

  return (
    <StrictDateFilter
      id={id}
      source={source}
      column={column}
      type={type}
      data={data}
      stateSlice={StateSlices.INTRO}
      isLoading={isLoading}
    />
  );
}
