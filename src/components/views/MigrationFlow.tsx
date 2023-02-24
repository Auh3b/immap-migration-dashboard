import { makeStyles } from '@material-ui/core/styles';
import { CategoryWidget, HistogramWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import hotspotSource from '../../data/sources/hotspotSource';
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
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid } from '@material-ui/core';

export default function MigrationFlow() {
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
        left: <LeftView />,
        right: <RightView />,
      }}
    </MainView>
  );
}

function LeftView (){
  return(
    <MainColumnView>
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
    </MainColumnView>
  )
}

function RightView(){
  return(
    <MainColumnView>
       <Grid item>
        <CategoryWidget
          id='reasonForTransitStay'
          title='Razones de no continuar viaje'
          dataSource={hotspotSource.id}
          column='carto_1_65'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_65'
        />
      </Grid>
      <Grid item>
        <HistogramWidget
        id='daysInTransitStay'
        title='Duración de estadía promedio'
        dataSource={hotspotSource.id}
        ticks={[1,2,3,4]}
        column='carto_1_68'
        operation={AggregationTypes.COUNT}
        onError={console.error}
        />
      </Grid>
    </MainColumnView>
  )
}
