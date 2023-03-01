import { useEffect } from 'react';
import servicePointsSource from 'data/sources/servicePointsSource';
import { SERVICE_POINTS_LAYER_ID } from 'components/layers/ServicePointsLayer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
  selectSourceById,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { CategoryWidget, PieWidget } from '@carto/react-widgets';
import mainSource from '../../data/sources/mainSource';
import { AggregationTypes } from '@carto/react-core';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Divider, Grid, Typography } from '@material-ui/core';
import { RootState } from 'store/store';

const useStyles = makeStyles(() => ({
  services: {},
}));

export default function Services() {
  const dispatch = useDispatch();
  // const classes = useStyles();
  // const {hotspotsLayer} = useSelector((state: RootState) => state.carto.layers)
  // const source = useSelector((state)=> selectSourceById(state, hotspotsLayer?.source))
  
  console.log('service mounted')
  // useEffect(() => {

  //   dispatch(addSource(servicePointsSource));

  //   dispatch(
  //     addLayer({
  //       id: SERVICE_POINTS_LAYER_ID,
  //       source: servicePointsSource.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(SERVICE_POINTS_LAYER_ID));
  //     dispatch(removeSource(servicePointsSource.id));

  //   };
  // }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <LeftView />,
        right: <RightView />,
      }}
    </MainView>
  );
}

const useViewStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  divider: {
    borderBottom: theme.spacing(2),
    borderTop: theme.spacing(2),
  },
}));

function LeftView() {
  const classes = useViewStyle();

  return (
    <MainColumnView>
      <Grid item className={classes.title}>
        <Typography variant='subtitle1'>Calidad para adultos</Typography>
      </Grid>
      <Divider className={classes.divider} />
      {/* <Grid item>
        <CategoryWidget
          id='serviceType'
          title='Tipo servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_47'
          operationColumn='carto_1_47'
        />
      </Grid>
      <Grid item>
        <PieWidget
          id='serviceQuality'
          title='Calidad servicio'
          dataSource={mainSource.id}
          column='carto_1_43'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_43'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='accessServices'
          title='Acceso a servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_41'
          operationColumn='carto_1_41'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='serviceSatisfaction'
          title='Satisfacción del servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_43'
          operationColumn='carto_1_43'
        />
      </Grid> */}
    </MainColumnView>
  );
}

function RightView() {
  const classes = useViewStyle();
  return (
    <MainColumnView>
      <Grid item className={classes.title}>
        <Typography variant='subtitle1'>Calidad para NNA</Typography>
      </Grid>
      <Divider className={classes.divider} />
      {/* <Grid item>
        <CategoryWidget
          id='serviceSatisfaction'
          title='Tipo servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_47'
          operationColumn='carto_1_47'
        />
      </Grid>
      <Grid item>
        <PieWidget
          id='serviceQuality'
          title='Calidad servicio'
          dataSource={mainSource.id}
          column='carto_1_51'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_51'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='accessServices'
          title='Acceso a servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_49'
          operationColumn='carto_1_49'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='serviceSatisfaction'
          title='Satisfacción del servicio'
          dataSource={mainSource.id}
          operation={AggregationTypes.COUNT}
          column='carto_1_51'
          operationColumn='carto_1_51'
        />
      </Grid> */}
    </MainColumnView>
  );
}
