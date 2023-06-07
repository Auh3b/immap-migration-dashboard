import premiseSource from 'data/sources/premiseSource';
import mainSource from 'data/sources/mainSource';
import timelineSource from 'data/sources/timelineSource';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import { useEffect } from 'react';
import { SURVEY_TIMELINE_LAYER_ID } from 'components/layers/SurveyTimelineLayer';
import DinamicaLeftView from './dinamicaViews/DinamicaLeftView';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';

export default function DinámicaAurora() {
  const dispatch = useDispatch();
  const sources = {
    premiseSource,
    mainSource,
    timelineSource,
  };

  useEffect(() => {
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
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: {
          element: <DinamicaLeftView dataSources={sources} />,
          expandable: false,
        },
      }}
    </MainView>
  );
}
