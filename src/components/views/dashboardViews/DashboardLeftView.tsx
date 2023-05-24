import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

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
      </MainColumnView>
    </LazyLoadComponent>
  );
}
