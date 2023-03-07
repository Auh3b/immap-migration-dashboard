import { SurveyDates } from '../indicators/dashboard/SurveyDates';
import mainSource from 'data/sources/mainSource';
import MainView from './main/MainView';
import { lazy, useEffect } from 'react';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from 'components/layers/SurveyConcentrationsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
} from '@carto/react-redux';
const  DashboardLeftView = lazy(()=> import('./dashboardViews/DashboardLeftView'))
const  DashboardRightView = lazy(()=> import('./dashboardViews/DashboardRightView'))

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addLayer({
        id: SURVEY_CONCENTRATIONS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <DashboardLeftView dataSources={{ mainSource }} />,
        right: <DashboardRightView dataSources={{ mainSource }} />,
        bottom: <SurveyDates dataSource={mainSource.id} />,
      }}
    </MainView>
  );
}
