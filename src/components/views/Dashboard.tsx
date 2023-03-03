import { SurveyDates } from './../common/indicators/dashboard/SurveyDates';
import mainSource from 'data/sources/mainSource';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid } from '@material-ui/core';
import { useEffect /*useState*/ } from 'react';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from 'components/layers/SurveyConcentrationsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  // addSource,
  // removeSource,
} from '@carto/react-redux';
import ChildTravelerAges from 'components/common/indicators/dashboard/ChildTravelerAges';
import GenderComposition from 'components/common/indicators/dashboard/GenderComposition';
import GroupSizeDistribution from 'components/common/indicators/dashboard/GroupSizeDistribution';
import TravelGroupAges from 'components/common/indicators/dashboard/TravelGroupAges';
import ChildrenTravelAlone from 'components/common/indicators/dashboard/ChildrenTravelAlone';

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
        left: <LeftView />,
        right: <RightView />,
        bottom: <SurveyDates  dataSource={mainSource.id}   />,
      }}
    </MainView>
  );
}

function LeftView() {
  return (
    <MainColumnView>
      <GenderComposition />
      <TravelGroupAges dataSource={mainSource.id}/>
      <GroupSizeDistribution />
    </MainColumnView>
  );
}

function RightView() {
  return (
    <MainColumnView>
      <ChildTravelerAges dataSource={mainSource.id}/>
      <ChildrenTravelAlone dataSource={mainSource.id}/>
      {/* <Grid item>
        <BarWidget
          id='disabledPeople'
          title='Presencia de personas con discapacidadad'
          dataSource={mainSource.id}
          column='cb_fl_id14'
          operation={AggregationTypes.COUNT}
          operationColumn='cb_fl_id14'
        />
      </Grid>
      <Grid item>
        <BarWidget
          id='pregnantWoment'
          title='Embarazos'
          dataSource={mainSource.id}
          column='cb_fl_id12'
          operation={AggregationTypes.COUNT}
          operationColumn='cb_fl_id12'
        />
      </Grid> */}
    </MainColumnView>
  );
}
