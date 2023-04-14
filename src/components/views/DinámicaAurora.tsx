import premiseSource from 'data/sources/premiseSource';
import mainSource from 'data/sources/mainSource';
import timelineSource from 'data/sources/timelineSource';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';
import MainView from './main/MainView';
import { useEffect } from 'react';
import { SURVEY_TIMELINE_LAYER_ID } from 'components/layers/SurveyTimelineLayer';
import DinamicaLeftView from './dinamicaViews/DinamicaLeftView';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
import { initialState } from 'store/initialStateSlice';

export default function DinámicaAurora() {
  const dispatch = useDispatch();
  const sources = {
    premiseSource,
    mainSource,
    timelineSource,
  };

  useEffect(() => {
    dispatch(
      setViewState({
        width: 1700,
        height: 890,
        latitude: 22.294007742085636,
        longitude: -89.47128457821132,
        zoom: 4,
      }),
    );

    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    dispatch(addSource(timelineSource));

    dispatch(
      addLayer({
        id: SURVEY_TIMELINE_LAYER_ID,
        source: timelineSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_TIMELINE_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(timelineSource.id));
      dispatch(removeSource(mainSource.id));
      dispatch(setViewState(initialState.viewState));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <DinamicaLeftView dataSources={sources} />,
      }}
    </MainView>
  );
}
