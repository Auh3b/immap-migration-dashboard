import { PregnantWoment } from './../common/indicators/dashboard/PregnantWoment';
import { PeopleWithDisability } from './../common/indicators/dashboard/PeopleWithDisability';
import { SurveyDates } from './../common/indicators/dashboard/SurveyDates';
import mainSource from 'data/sources/mainSource';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
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
import PlacesChildrenTravelAlone from 'components/common/indicators/dashboard/PlacesChildrenTravelAlone';
import SleepOutDoor from 'components/common/indicators/dashboard/SleepOutDoor';
import SickPeople from 'components/common/indicators/dashboard/SickPeople';
import RestrictFood from 'components/common/indicators/dashboard/RestrictedFood';

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
      <GenderComposition dataSource={mainSource.id} />
      <TravelGroupAges dataSource={mainSource.id}/>
      <GroupSizeDistribution dataSource={mainSource.id} />
      <SleepOutDoor dataSource={mainSource.id}/>
      <RestrictFood dataSource={mainSource.id} />
      <SickPeople dataSource={mainSource.id} />
    </MainColumnView>
  );
}

function RightView() {
  return (
    <MainColumnView>
      <ChildTravelerAges dataSource={mainSource.id} />
      <ChildrenTravelAlone dataSource={mainSource.id} />
      <PlacesChildrenTravelAlone dataSource={mainSource.id} />
      <PeopleWithDisability dataSource={mainSource.id} />
      <PregnantWoment dataSource={mainSource.id} />
    </MainColumnView>
  );
}
