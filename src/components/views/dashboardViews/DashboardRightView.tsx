import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const PregnantWoment = lazy(
  () => import('components/indicators/dashboard/PregnantWoment'),
);

const SickPeople = lazy(
  () => import('components/indicators/dashboard/SickPeople'),
);
const SleepOutDoor = lazy(
  () => import('components/indicators/dashboard/SleepOutDoor'),
);
const RestrictedFood = lazy(
  () => import('components/indicators/dashboard/RestrictedFood'),
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
        <SleepOutDoor dataSource={mainSource.id} />
        <RestrictedFood dataSource={mainSource.id} />
        <SickPeople dataSource={mainSource.id} />
        <PregnantWoment dataSource={mainSource.id} />
      </MainColumnView>
    </LazyLoadComponent>
  );
}
