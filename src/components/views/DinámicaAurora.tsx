import { makeStyles } from '@material-ui/core/styles';
import premiseSource from 'data/sources/premiseSource';
import mainSource from 'data/sources/mainSource';
import timelineSource from 'data/sources/timelineSource';
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import DinamicaMiddleView from './dinamicaViews/DinamicaMiddleView';
import { useEffect } from 'react';
import { SURVEY_TIMELINE_LAYER_ID } from 'components/layers/SurveyTimelineLayer';
import DinamicaLeftView from './dinamicaViews/DinamicaLeftView';

const useStyles = makeStyles(() => ({
  dinámicaAurora: {},
}));

export default function DinámicaAurora() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sources = {
    premiseSource: premiseSource.id,
    mainSource: mainSource.id,
    timelineSource: timelineSource.id
  }
  
  useEffect(() => {
    dispatch(addSource(mainSource));

    dispatch(
      addLayer({
        id: SURVEY_TIMELINE_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_TIMELINE_LAYER_ID));
      dispatch(removeSource(mainSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <DinamicaLeftView dataSources={sources} />
        // middle: <DinamicaMiddleView  dataSources={sources}/>
      }}
    </MainView>
  );
}
