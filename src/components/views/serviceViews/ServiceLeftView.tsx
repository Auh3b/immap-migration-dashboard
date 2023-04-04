import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const ServiceQualityAdult = lazy(
  () => import('components/indicators/services/ServiceQualityAdult'),
);
const ServiceTypeAdult = lazy(
  () => import('components/indicators/services/ServiceTypeAdult'),
);

export default function ServiceLeftView({ dataSources, classes }: any) {
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <ServiceTypeAdult dataSource={mainSource.id} />
      <ServiceQualityAdult dataSource={mainSource.id} />
    </MainColumnView>
  );
}
