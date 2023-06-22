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

export default function ServiceFeedbackRightView({ dataSources }: any) {
  const { serviceFeedbackNnaV2Source } = dataSources;

  return (
    <MainColumnView>
      <ServiceTypeChildren dataSource={serviceFeedbackNnaV2Source.id} />
      <ServiceAccessChildren dataSource={serviceFeedbackNnaV2Source.id} />
      <ServiceQualityChildren dataSource={serviceFeedbackNnaV2Source.id} />
      <ServiceSatisfyChildren dataSource={serviceFeedbackNnaV2Source.id} />
    </MainColumnView>
  );
}
