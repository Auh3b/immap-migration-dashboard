import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { CategoryWidget, PieWidget } from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes } from '@carto/react-core';
import MainView from './main/MainView';
import { useOutletContext } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  services: {},
}));

export default function Services() {
  const classes = useStyles();
  // [hygen] Add useEffect

  return (
  <MainView>
    {{
      left:<CategoryWidget
      id='serviceType'
      title='Tipo servicio'
      dataSource={hotspotSource.id}
      operation={AggregationTypes.COUNT}
      column='carto_1_47'
      operationColumn='carto_1_47'
    />,
      right:   <CategoryWidget
      id='serviceSatisfaction'
      title='Satisfacción del servicio'
      dataSource={hotspotSource.id}
      operation={AggregationTypes.COUNT}
      column='carto_1_43'
      operationColumn='carto_1_43'
    />,
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
