import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const PregnantWoment = lazy(
  () => import('components/indicators/dashboard/PregnantWoment'),
);
const PlacesChildrenTravelAlone = lazy(
  () =>
    import('components/indicators/dashboard/PlacesChildrenTravelAlone'),
);
const PeopleWithDisability = lazy(
  () => import('components/indicators/dashboard/PeopleWithDisability'),
);
const ChildTravelerAges = lazy(
  () => import('components/indicators/dashboard/ChildTravelerAges'),
);
const ChildrenTravelAlone = lazy(
  () => import('components/indicators/dashboard/ChildrenTravelAlone'),
);

export default function DashboardRightView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { mainSource } = dataSources;
  return (
    <LazyLoadComponent>
      <MainColumnView>
        <ChildTravelerAges dataSource={mainSource.id} />
        <ChildrenTravelAlone dataSource={mainSource.id} />
        <PlacesChildrenTravelAlone dataSource={mainSource.id} />
        <PeopleWithDisability dataSource={mainSource.id} />
        <PregnantWoment dataSource={mainSource.id} />
      </MainColumnView>
    </LazyLoadComponent>
  );
}
