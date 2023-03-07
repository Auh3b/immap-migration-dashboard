import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const GenderComposition = lazy(
  () => import('components/indicators/dashboard/GenderComposition'),
);
const SleepOutDoor = lazy(
  () => import('components/indicators/dashboard/SleepOutDoor'),
);
const RestrictedFood = lazy(
  () => import('components/indicators/dashboard/RestrictedFood'),
);
const TravelGroupAges = lazy(
  () => import('components/indicators/dashboard/TravelGroupAges'),
);
const SickPeople = lazy(
  () => import('components/indicators/dashboard/SickPeople'),
);
const GroupSizeDistribution = lazy(
  () => import('components/indicators/dashboard/GroupSizeDistribution'),
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
        <GenderComposition dataSource={mainSource.id} />
        <TravelGroupAges dataSource={mainSource.id} />
        <GroupSizeDistribution dataSource={mainSource.id} />
        <SleepOutDoor dataSource={mainSource.id} />
        <RestrictedFood dataSource={mainSource.id} />
        <SickPeople dataSource={mainSource.id} />
      </MainColumnView>
    </LazyLoadComponent>
  );
}
