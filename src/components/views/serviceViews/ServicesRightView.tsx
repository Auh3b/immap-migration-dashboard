import { Divider, Grid, Typography } from '@material-ui/core';
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
export default function ServicesRightView({ dataSources, classes }: any) {
  const { mainSource } = dataSources;

  return (
    <MainColumnView>
      <Grid item className={classes.title}>
        <Typography variant='subtitle1'>Calidad para NNA</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <ServiceTypeChildren dataSource={mainSource.id} />
      <ServiceAccessChildren dataSource={mainSource.id} />
      <ServiceQualityChildren dataSource={mainSource.id} />
      <ServiceSatisfyChildren dataSource={mainSource.id} />
    </MainColumnView>
  );
}
