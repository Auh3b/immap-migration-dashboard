import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

// const GenderComposition = lazy(
//   () => import('components/indicators/dashboard/GenderComposition'),
// );
// const TravelGroupAges = lazy(
//   () => import('components/indicators/dashboard/TravelGroupAges'),
// );
// const GroupSizeDistribution = lazy(
//   () => import('components/indicators/dashboard/GroupSizeDistribution'),
// );
// const PeopleWithDisability = lazy(
//   () => import('components/indicators/dashboard/PeopleWithDisability'),
// );
const ChildTravelerAges = lazy(
  () => import('components/indicators/dashboard/ChildTravelerAges'),
);
const SleepOutDoor = lazy(
  () => import('components/indicators/dashboard/SleepOutDoor'),
);
const RestrictedFood = lazy(
  () => import('components/indicators/dashboard/RestrictedFood'),
);

export default function DashboardLeftView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { mainSource } = dataSources;
  return (
    <LazyLoadComponent>
      <MainColumnView>
        <ChildTravelerAges dataSource={mainSource.id} />
        <SleepOutDoor dataSource={mainSource.id} />
        <RestrictedFood dataSource={mainSource.id} />
        {/* <GenderComposition dataSource={mainSource.id} />
        <TravelGroupAges dataSource={mainSource.id} />
        <GroupSizeDistribution dataSource={mainSource.id} />
        <PeopleWithDisability dataSource={mainSource.id} /> */}
      </MainColumnView>
    </LazyLoadComponent>
  );
}
