import MigrationRightView from './migrationViews/MigrationRightView';
import MigrationLeftView from './migrationViews/MigrationLeftView';
import mainSource from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addLayer, removeLayer, setViewState } from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );
    dispatch(setViewState({
      //@ts-ignore
      minZoom: 1,
    }))

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(setViewState({
        //@ts-ignore
        minZoom: 5,
      }))
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
