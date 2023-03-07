import MigrationRightView from './migrationViews/MigrationRightView';
import MigrationLeftView from './migrationViews/MigrationLeftView';
import mainSource from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  addLayer,
  addSource,
  removeLayer,
  setViewState,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setViewState({ dragRotate: true }));
    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(setViewState({ dragRotate: false }));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <MigrationLeftView dataSources={{ mainSource }} />,
        right: <MigrationRightView dataSources={{ mainSource }} />,
      }}
    </MainView>
  );
}
