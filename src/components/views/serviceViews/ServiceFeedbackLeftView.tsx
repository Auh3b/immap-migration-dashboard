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

export default function ServiceFeedbackLeftView({ dataSources }: any) {
  const { serviceFeedbackV2Source } = dataSources;
  return (
    <MainColumnView>
      <ServiceTypeAdult dataSource={serviceFeedbackV2Source} />
      <ServiceAccessAdult dataSource={serviceFeedbackV2Source} />
      <ServiceQualityAdult dataSource={serviceFeedbackV2Source} />
      <ServiceSatisfyAdult dataSource={serviceFeedbackV2Source} />
    </MainColumnView>
  );
}
