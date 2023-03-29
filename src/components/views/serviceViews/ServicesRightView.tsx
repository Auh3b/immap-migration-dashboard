import { Divider, Grid, Typography } from '@material-ui/core';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const ServiceSatisfyAdult = lazy(
  () => import('components/indicators/services/ServiceSatisfyAdult'),
);
const ServiceAccessAdult = lazy(
  () => import('components/indicators/services/ServiceAccessAdult'),
);

export default function ServicesRightView({ dataSources, classes }: any) {
  const { mainSource } = dataSources;

  return (
    <MainColumnView>
      <ServiceAccessAdult dataSource={mainSource.id} />
      <ServiceSatisfyAdult dataSource={mainSource.id} />
    </MainColumnView>
  );
}
