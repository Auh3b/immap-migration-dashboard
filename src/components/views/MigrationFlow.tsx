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
import { initialState } from 'store/initialStateSlice';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setViewState({
        width: 1400,
        height: 890,
        latitude: -0.7592270882110561,
        longitude: -61.55388709207003,
        zoom: 2.1807410178760893,
      }),
    );
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

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(mainSource.id));
      dispatch(setViewState(initialState.viewState));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: { element: (<MigrationLeftView dataSources={{ mainSource }} />) },
        right: { element: (<MigrationRightView dataSources={{ mainSource }} />) },
      }}
    </MainView>
  );
}
