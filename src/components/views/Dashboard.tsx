import { makeStyles } from '@material-ui/core/styles';
import {
  CategoryWidget,
  PieWidget,
  TimeSeriesWidget,
} from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes, GroupDateTypes } from '@carto/react-core';
import MainView from './main/MainView';

const useStyles = makeStyles(() => ({
  dashboard: {
    width: '100%',
    position: 'absolute',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: (
          <PieWidget
            id='genderDistribution'
            title='Género Porcentaje de género'
            dataSource={hotspotSource.id}
            column='carto_10_5'
            operation={AggregationTypes.COUNT}
            operationColumn='carto_10_5'
          />
        ),
        right: (
          <CategoryWidget
            id='ageDistribution'
            title='Distribución de tamaño grupo'
            dataSource={hotspotSource.id}
            column='carto_10_3'
            operation={AggregationTypes.COUNT}
            operationColumn='carto_10_3'
          />
        ),
        bottom: (
          <TimeSeriesWidget
            id='surveyDates'
            title='Distribución de tamaño grupo'
            dataSource={hotspotSource.id}
            column='carto_10_1'
            stepSize={GroupDateTypes.DAYS}
          />
        ),
      }}
    </MainView>
    // <Grid container direction='column' className={classes.dashboard}>
    //   {map}
    //   <Grid item>
    // <PieWidget
    //   id='genderDistribution'
    //   title='Género Porcentaje de género'
    //   dataSource={hotspotSource.id}
    //   column='carto_10_5'
    //   operation={AggregationTypes.COUNT}
    //   operationColumn='carto_10_5'
    // />
    //   </Grid>
    //   <Grid item>
    // <CategoryWidget
    //   id='ageDistribution'
    //   title='Distribución de tamaño grupo'
    //   dataSource={hotspotSource.id}
    //   column='carto_10_3'
    //   operation={AggregationTypes.COUNT}
    //   operationColumn='carto_10_3'
    // />
    //   </Grid>
    //   <Grid item>
    //     <TimeSeriesWidget
    //       id='surveyDates'
    //       title='Distribución de tamaño grupo'
    //       dataSource={hotspotSource.id}
    //       column='carto_10_1'
    //       stepSize={GroupDateTypes.DAYS}
    //     />
    //   </Grid>
    // </Grid>
  );
}
