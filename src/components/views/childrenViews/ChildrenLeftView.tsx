import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const ChildTravelerAges = lazy(
  () => import('components/indicators/dashboard/ChildTravelerAges'),
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

export default function ChildrenLeftView({ dataSources, classes }: any) {
  const { mainSource, aggreagateChildren } = dataSources;
  return (
    <MainColumnView>
      <ChildTravelerAges dataSource={mainSource} />
      <ServiceTypeChildren dataSource={mainSource} />
      <ServiceAccessChildren dataSource={aggreagateChildren} />
      <ServiceQualityChildren dataSource={aggreagateChildren} />
      <ServiceSatisfyChildren dataSource={aggreagateChildren} />
    </MainColumnView>
  );
}
