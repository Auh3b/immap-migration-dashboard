import { makeStyles } from '@material-ui/core/styles';
import { CategoryWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import hotspotSource from '../../data/sources/hotspotSource';
import { useOutletContext } from 'react-router-dom';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';
import migrationFlowSource from 'data/sources/migrationFlowSource';
const useStyles = makeStyles(() => ({
  migrationFlow: {},
}));

export default function MigrationFlow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(addSource(migrationFlowSource));
    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: migrationFlowSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(removeSource(migrationFlowSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: (
          <CategoryWidget
            id='originCountry'
            title='País de origen'
            dataSource={hotspotSource.id}
            column='carto_10_7'
            operation={AggregationTypes.COUNT}
            operationColumn='carto_10_7'
          />
        ),
        right: (
          <CategoryWidget
            id='originCountry'
            title='País donde residía hace un año'
            dataSource={hotspotSource.id}
            column='carto_1_11'
            operation={AggregationTypes.COUNT}
            operationColumn='carto_1_11'
          />
        ),
      }}
    </MainView>
    // <Grid container direction='column' className={classes.migrationFlow}>
    //   <Grid item>
    // <CategoryWidget
    //   id='originCountry'
    //   title='País de origen'
    //   dataSource={hotspotSource.id}
    //   column='carto_10_7'
    //   operation={AggregationTypes.COUNT}
    //   operationColumn='carto_10_7'
    // />
    //   </Grid>
    //   <Grid item>
    //     <CategoryWidget
    //       id='departCountry'
    //       title='País de donde viene'
    //       dataSource={hotspotSource.id}
    //       column='carto_10_9'
    //       operation={AggregationTypes.COUNT}
    //       operationColumn='carto_10_9'
    //     />
    //   </Grid>
    //   <Grid item>
    // <CategoryWidget
    //   id='originCountry'
    //   title='País donde residía hace un año'
    //   dataSource={hotspotSource.id}
    //   column='carto_1_11'
    //   operation={AggregationTypes.COUNT}
    //   operationColumn='carto_1_11'
    // />
    //   </Grid>
    // </Grid>
  );
}
