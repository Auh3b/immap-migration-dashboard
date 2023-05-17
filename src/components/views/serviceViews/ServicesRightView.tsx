import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

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

export default function ServicesRightView({ dataSources }: any) {
  const { aggreateServiceChildrenSource } = dataSources;

  return (
    <MainColumnView>
      <ServiceTypeChildren dataSource={aggreateServiceChildrenSource.id} />
      <ServiceAccessChildren dataSource={aggreateServiceChildrenSource.id} />
      <ServiceQualityChildren dataSource={aggreateServiceChildrenSource.id} />
      <ServiceSatisfyChildren dataSource={aggreateServiceChildrenSource.id} />
    </MainColumnView>
  );
}
