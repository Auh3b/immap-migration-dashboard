//@ts-nocheck

import { lazy, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@material-ui/core';
import mapContext from 'context/mapContext';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
import mainSource from 'data/sources/mainSource';
// import Sidebar from './Sidebar';

const Sidebar = lazy(
  () =>
    import(
      /* webpackChunkName: 'map-container' */ 'components/views/main/Sidebar'
    ),
);
const MapContainer = lazy(
  () =>
    import(
      /* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer'
    ),
);
const OutletView = lazy(
  () =>
    import(
      /* webpackChunkName: 'OutletView' */ 'components/views/main/OutletView'
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
  const [mapRef, setMapRef] = useState(null);
  const dispatch = useDispatch();
  // [hygen] Add useEffect
  useEffect(() => {
    dispatch(addSource(mainSource));

    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    // dispatch(
    //   addLayer({
    //     id: SURVEY_CONCENTRATIONS_LAYER_ID,
    //     source: mainSource.id,
    //   }),
    // );

    return () => {
      // dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(mainSource.id));
    };
  }, [dispatch]);
  return (
    <Grid
      container
      direction='row'
      alignItems='stretch'
      item
      xs
      className={classes.main}
    >
      <mapContext.Provider value={{ mapRef, setMapRef }}>
        <LazyLoadComponent>
          <OutletView />
          {/* <Sidebar />
            <MapContainer /> */}
          <ErrorSnackbar />
        </LazyLoadComponent>
      </mapContext.Provider>
    </Grid>
  );
}
