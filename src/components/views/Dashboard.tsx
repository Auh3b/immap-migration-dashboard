import { SurveyDates } from '../indicators/dashboard/SurveyDates';
import mainSource from 'data/sources/mainSource';
import MainView from './main/MainView';
import { lazy, useEffect } from 'react';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from 'components/layers/SurveyConcentrationsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
const DashboardLeftView = lazy(
  () => import('./dashboardViews/DashboardLeftView'),
);
const DashboardRightView = lazy(
  () => import('./dashboardViews/DashboardRightView'),
);

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: SURVEY_CONCENTRATIONS_LAYER_ID,
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
      dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(mainSource.id));
    };
  }, [dispatch]);
  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <DashboardLeftView dataSources={{ mainSource }} />,
        right: <DashboardRightView dataSources={{ mainSource }} />,
        middle: <SurveyDates dataSource={mainSource.id} />,
      }}
    </MainView>
  );
}
