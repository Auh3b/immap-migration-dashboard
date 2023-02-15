import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { CategoryWidget } from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource'
import { AggregationTypes } from '@carto/react-core';

const useStyles = makeStyles(() => ({
  services: {},
}));

export default function Services() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.services}>
      <Grid item>
        <CategoryWidget
        dataSource={hotspotSource.id}
        operation={AggregationTypes.COUNT}
        column='carto_10_5'
        operationColumn='carto_10_2'
        />
      </Grid>
    </Grid>
  );
}
