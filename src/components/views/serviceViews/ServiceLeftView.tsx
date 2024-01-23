import { MainColumnView } from 'components/common/MainColumnView';
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

export default function ServiceLeftView({ dataSources }: any) {
  const { aggregateServicesSource } = dataSources;
  return (
    <MainColumnView>
      <ServiceTypeAdult dataSource={aggregateServicesSource} />
      <ServiceAccessAdult dataSource={aggregateServicesSource} />
      <ServiceQualityAdult dataSource={aggregateServicesSource} />
      <ServiceSatisfyAdult dataSource={aggregateServicesSource} />
    </MainColumnView>
  );
}
