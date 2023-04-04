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
  removeSource,
  setViewState,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addSource(mainSource));

    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );
    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: mainSource.id,
      }),
    );
    dispatch(
      setViewState({
        //@ts-ignore
        minZoom: 1,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(mainSource.id));
      dispatch(
        setViewState({
          //@ts-ignore
          minZoom: 5,
        }),
      );
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
