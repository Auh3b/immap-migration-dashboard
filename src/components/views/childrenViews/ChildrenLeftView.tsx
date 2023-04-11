import { Divider, Grid, Typography } from '@material-ui/core';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const ChildTravelerAges = lazy(
  () => import('components/indicators/dashboard/ChildTravelerAges'),
);
const ChildrenTravelAlone = lazy(
  () => import('components/indicators/dashboard/ChildrenTravelAlone'),
);
const PlacesChildrenTravelAlone = lazy(
  () => import('components/indicators/dashboard/PlacesChildrenTravelAlone'),
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
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <Divider className={classes.divider} />
      <ChildTravelerAges dataSource={mainSource} />
      <ChildrenTravelAlone dataSource={mainSource} />
      <PlacesChildrenTravelAlone dataSource={mainSource} />
      <ServiceTypeChildren dataSource={mainSource} />
      <ServiceAccessChildren dataSource={mainSource} />
      <ServiceQualityChildren dataSource={mainSource} />
      <ServiceSatisfyChildren dataSource={mainSource} />
    </MainColumnView>
  );
}
