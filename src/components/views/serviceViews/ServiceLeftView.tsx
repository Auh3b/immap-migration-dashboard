import { MainColumnView } from 'components/common/MainColumnView';
import ServiceAvailability from 'components/indicators/services/ServiceAvailability';
import { lazy } from 'react';

const ServiceQualityAdult = lazy(
  () => import('components/indicators/services/ServiceQualityAdult'),
);
const ServiceTypeAdult = lazy(
  () => import('components/indicators/services/ServiceTypeAdult'),
);

export default function ServiceLeftView({ dataSources, classes }: any) {
  const { mainSource, aggregateServicesSource } = dataSources;
  return (
    <MainColumnView>
      <ServiceAvailability dataSource={ aggregateServicesSource.id } />
      <ServiceTypeAdult dataSource={mainSource.id} />
      <ServiceQualityAdult dataSource={mainSource.id} />
    </MainColumnView>
  );
}
