import { SurveyDates } from '../indicators/dashboard/SurveyDates';
import mainSource from 'data/sources/mainSource';
import premiseSource from 'data/sources/premiseSource';
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
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
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
    dispatch(addSource(premiseSource));
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

    dispatch(
      addLayer({
        id: PREMISE_SERVICES_LAYER_ID,
        source: premiseSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID));
      dispatch(removeSource(mainSource.id));
      dispatch(removeSource(premiseSource.id));
    };
  }, [dispatch]);
  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: {
          element: <DashboardLeftView dataSources={{ mainSource }} />,
          expandable: false,
        },
        right: {
          element: (
            <DashboardRightView dataSources={{ mainSource, premiseSource }} />
          ),
          expandable: false,
        },
        middle: { element: <SurveyDates dataSource={mainSource.id} /> },
      }}
    </MainView>
  );
}
