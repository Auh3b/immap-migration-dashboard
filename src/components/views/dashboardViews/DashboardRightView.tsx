import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const PregnantWoment = lazy(
  () => import('components/common/indicators/dashboard/PregnantWoment'),
);
const PlacesChildrenTravelAlone = lazy(
  () =>
    import('components/common/indicators/dashboard/PlacesChildrenTravelAlone'),
);
const PeopleWithDisability = lazy(
  () => import('components/common/indicators/dashboard/PeopleWithDisability'),
);
const ChildTravelerAges = lazy(
  () => import('components/common/indicators/dashboard/ChildTravelerAges'),
);
const ChildrenTravelAlone = lazy(
  () => import('components/common/indicators/dashboard/ChildrenTravelAlone'),
);

export default function DashboardRightView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { mainSource } = dataSources;
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
