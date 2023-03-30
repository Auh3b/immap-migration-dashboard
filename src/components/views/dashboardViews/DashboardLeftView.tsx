import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const GenderComposition = lazy(
  () => import('components/indicators/dashboard/GenderComposition'),
);
const TravelGroupAges = lazy(
  () => import('components/indicators/dashboard/TravelGroupAges'),
);
const GroupSizeDistribution = lazy(
  () => import('components/indicators/dashboard/GroupSizeDistribution'),
);
const PeopleWithDisability = lazy(
  () => import('components/indicators/dashboard/PeopleWithDisability'),
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
        <PeopleWithDisability dataSource={mainSource.id} />
      </MainColumnView>
    </LazyLoadComponent>
  );
}
