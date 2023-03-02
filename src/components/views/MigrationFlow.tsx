// import { makeStyles } from '@material-ui/core/styles';
import { CategoryWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import mainSource from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  addLayer,
  addSource,
  removeLayer,
  // removeSource,
  setViewState,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';
// import migrationFlowSource from 'data/sources/migrationFlowSource';
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid } from '@material-ui/core';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setViewState({ pitch: 30 }));
    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      // dispatch(removeSource(mainSource.id));
      dispatch(setViewState({ pitch: 0 }));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <LeftView />,
        // right: <RightView />,
      }}
    </MainView>
  );
}

function LeftView() {
  return (
    <MainColumnView>
      <Grid item>
        <CategoryWidget
          id='originCountry'
          title='País de origen'
          dataSource={mainSource.id}
          column='pais_nacim'
          operation={AggregationTypes.COUNT}
          operationColumn='pais_nacim'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='departCountry'
          title='País de donde viene'
          dataSource={mainSource.id}
          column='pais_inici'
          operation={AggregationTypes.COUNT}
          operationColumn='pais_inici'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='originCountry'
          title='País donde residía hace un año'
          dataSource={mainSource.id}
          column='pais_vivia'
          operation={AggregationTypes.COUNT}
          operationColumn='pais_vivia'
        />
      </Grid>
    </MainColumnView>
  );
}

// function RightView() {
//   return (
//     <MainColumnView>
//       <Grid item>
//         <CategoryWidget
//           id='reasonForTransitStay'
//           title='Razones de no continuar viaje'
//           dataSource={hotspotSource.id}
//           column='cb_fl_con04'
//           operation={AggregationTypes.COUNT}
//           operationColumn='cb_fl_con04'
//         />
//       </Grid>
//       <Grid item>
//         <HistogramWidget
//           id='daysInTransitStay'
//           title='Duración de estadía promedio'
//           dataSource={hotspotSource.id}
//           ticks={[1, 2, 3, 4]}
//           column='carto_1_68'
//           operation={AggregationTypes.COUNT}
//           onError={console.error}
//         />
//       </Grid>
//     </MainColumnView>
//   );
// }
