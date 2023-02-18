import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {
  CategoryWidget,
  PieWidget,
  TimeSeriesWidget,
} from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes, GroupDateTypes } from '@carto/react-core';

const useStyles = makeStyles(() => ({
  dashboard: {},
}));

export default function Dashboard() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.dashboard}>
      <Grid item>
        <PieWidget
          id='genderDistribution'
          title='Género Porcentaje de género'
          dataSource={hotspotSource.id}
          column='carto_10_5'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_5'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='ageDistribution'
          title='Distribución de tamaño grupo'
          dataSource={hotspotSource.id}
          column='carto_10_3'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_3'
        />
      </Grid>
      <Grid item>
        <TimeSeriesWidget
          id='surveyDates'
          title='Distribución de tamaño grupo'
          dataSource={hotspotSource.id}
          column='carto_10_1'
          stepSize={GroupDateTypes.DAYS}
        />
      </Grid>
    </Grid>
  );
}
