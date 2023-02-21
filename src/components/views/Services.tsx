import { useEffect } from 'react';
import servicePointsSource from 'data/sources/servicePointsSource';
import { SERVICE_POINTS_LAYER_ID } from 'components/layers/ServicePointsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { CategoryWidget, PieWidget } from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes } from '@carto/react-core';
import MainView from './main/MainView';

const useStyles = makeStyles(() => ({
  services: {},
}));

export default function Services() {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(addSource(servicePointsSource));

    dispatch(
      addLayer({
        id: SERVICE_POINTS_LAYER_ID,
        source: servicePointsSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SERVICE_POINTS_LAYER_ID));
      dispatch(removeSource(servicePointsSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: (
          <CategoryWidget
            id='serviceType'
            title='Tipo servicio'
            dataSource={hotspotSource.id}
            operation={AggregationTypes.COUNT}
            column='carto_1_47'
            operationColumn='carto_1_47'
          />
        ),
        right: (
          <CategoryWidget
            id='serviceSatisfaction'
            title='Satisfacción del servicio'
            dataSource={hotspotSource.id}
            operation={AggregationTypes.COUNT}
            column='carto_1_43'
            operationColumn='carto_1_43'
          />
        ),
      }}
    </MainView>

    // <Grid container direction='column' className={classes.services}>
    //   <Grid item>
    // <CategoryWidget
    //   id='serviceType'
    //   title='Tipo servicio'
    //   dataSource={hotspotSource.id}
    //   operation={AggregationTypes.COUNT}
    //   column='carto_1_47'
    //   operationColumn='carto_1_47'
    // />
    //   </Grid>
    //   <Grid item>
    //     <PieWidget
    //       id='serviceQuality'
    //       title='Calidad servicio'
    //       dataSource={hotspotSource.id}
    //       column='carto_1_51'
    //       operation={AggregationTypes.COUNT}
    //       operationColumn='carto_1_51'
    //     />
    //   </Grid>
    //   <Grid item>
    //     <CategoryWidget
    //       id='serviceAccess'
    //       title='Acceso a servicio'
    //       dataSource={hotspotSource.id}
    //       operation={AggregationTypes.COUNT}
    //       column='carto_1_41'
    //       operationColumn='carto_1_41'
    //     />
    //   </Grid>
    //   <Grid item>
    // <CategoryWidget
    //   id='serviceSatisfaction'
    //   title='Satisfacción del servicio'
    //   dataSource={hotspotSource.id}
    //   operation={AggregationTypes.COUNT}
    //   column='carto_1_43'
    //   operationColumn='carto_1_43'
    // />
    //   </Grid>
    // </Grid>
  );
}
