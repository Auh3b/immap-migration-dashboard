import { MainColumnView } from 'components/common/MainColumnView';
import ServiceAvailability from 'components/indicators/services/ServiceAvailability';
import { lazy } from 'react';

const ServiceQualityAdult = lazy(
  () => import('components/indicators/services/ServiceQualityAdult'),
);
const ServiceTypeAdult = lazy(
  () => import('components/indicators/services/ServiceTypeAdult'),
);
const ServiceSatisfyAdult = lazy(
  () => import('components/indicators/services/ServiceSatisfyAdult'),
);
const ServiceAccessAdult = lazy(
  () => import('components/indicators/services/ServiceAccessAdult'),
);

export default function ServiceLeftView({ dataSources, classes }: any) {
  const { mainSource, aggregateServicesSource } = dataSources;
  return (
    <MainColumnView>
      {/* <ServiceAvailability dataSource={aggregateServicesSource.id} /> */}
      <ServiceTypeAdult dataSource={mainSource.id} />
      <ServiceQualityAdult dataSource={aggregateServicesSource.id} />
      <ServiceAccessAdult dataSource={aggregateServicesSource.id} />
      <ServiceSatisfyAdult dataSource={aggregateServicesSource.id} />
    </MainColumnView>
  );
}
