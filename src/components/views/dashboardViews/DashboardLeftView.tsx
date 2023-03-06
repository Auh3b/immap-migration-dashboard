import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const GenderComposition = lazy(
  () => import('components/common/indicators/dashboard/GenderComposition'),
);
const SleepOutDoor = lazy(
  () => import('components/common/indicators/dashboard/SleepOutDoor'),
);
const RestrictedFood = lazy(
  () => import('components/common/indicators/dashboard/RestrictedFood'),
);
const TravelGroupAges = lazy(
  () => import('components/common/indicators/dashboard/TravelGroupAges'),
);
const SickPeople = lazy(
  () => import('components/common/indicators/dashboard/SickPeople'),
);
const GroupSizeDistribution = lazy(
  () => import('components/common/indicators/dashboard/GroupSizeDistribution'),
);

export default function DashboardLeftView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <GenderComposition dataSource={mainSource.id} />
      <TravelGroupAges dataSource={mainSource.id} />
      <GroupSizeDistribution dataSource={mainSource.id} />
      <SleepOutDoor dataSource={mainSource.id} />
      <RestrictedFood dataSource={mainSource.id} />
      <SickPeople dataSource={mainSource.id} />
    </MainColumnView>
  );
}
