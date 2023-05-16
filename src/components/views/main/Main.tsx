//@ts-nocheck

import { lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@material-ui/core';
import PageFallback from 'components/common/PageFallback';
import ChartModule from 'components/common/ChartModule';

const OutletView = lazy(
  () =>
    import(
      /* webpackChunkName: 'outlet-view' */ 'components/views/main/OutletView'
    ),
);
const ErrorSnackbar = lazy(
  () =>
    import(
      /* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar'
    ),
);

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

export default function Main() {
  const classes = useStyles();
  // [hygen] Add useEffect
  return (
    <Grid
      container
      wrap='nowrap'
      direction='row'
      alignItems='stretch'
      item
      xs
      className={classes.main}
    >
      <LazyLoadComponent fallback={<PageFallback />}>
        <OutletView />
        <ErrorSnackbar />
        <ChartModule />
      </LazyLoadComponent>
    </Grid>
  );
}
