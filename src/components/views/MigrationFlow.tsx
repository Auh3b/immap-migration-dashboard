import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { CategoryWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import hotspotSource from '../../data/sources/hotspotSource';

const useStyles = makeStyles(() => ({
  migrationFlow: {},
}));

export default function MigrationFlow() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.migrationFlow}>
      <Grid item>
        <CategoryWidget
          id='originCountry'
          title='País de origen'
          dataSource={hotspotSource.id}
          column='carto_10_7'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_7'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='departCountry'
          title='País de donde viene'
          dataSource={hotspotSource.id}
          column='carto_10_9'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_9'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='originCountry'
          title='País donde residía hace un año'
          dataSource={hotspotSource.id}
          column='carto_1_11'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_11'
        />
      </Grid>
    </Grid>
  );
}
