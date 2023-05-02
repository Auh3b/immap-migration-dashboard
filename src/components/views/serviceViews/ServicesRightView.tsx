import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const ServiceSatisfyAdult = lazy(
  () => import('components/indicators/services/ServiceSatisfyAdult'),
);
const ServiceAccessAdult = lazy(
  () => import('components/indicators/services/ServiceAccessAdult'),
);
const ServiceTypeChildren = lazy(
  () => import('components/indicators/services/ServiceTypeChildren'),
);
const ServiceAccessChildren = lazy(
  () => import('components/indicators/services/ServiceAccessChildren'),
);
const ServiceQualityChildren = lazy(
  () => import('components/indicators/services/ServiceQualityChildren'),
);
const ServiceSatisfyChildren = lazy(
  () => import('components/indicators/services/ServiceSatisfyChildren'),
);

export default function ServicesRightView({ dataSources, classes }: any) {
  const { mainSource, aggregateServicesSource, aggreateServiceChildrenSource } =
    dataSources;

  return (
    <MainColumnView>
      <ServiceTypeChildren dataSource={mainSource.id} />
      <ServiceAccessChildren dataSource={aggreateServiceChildrenSource.id} />
      <ServiceQualityChildren dataSource={aggreateServiceChildrenSource.id} />
      <ServiceSatisfyChildren dataSource={aggreateServiceChildrenSource.id} />
      {/* <ServiceAccessAdult dataSource={aggregateServicesSource.id} />
      <ServiceSatisfyAdult dataSource={aggregateServicesSource.id} /> */}
    </MainColumnView>
  );
}
