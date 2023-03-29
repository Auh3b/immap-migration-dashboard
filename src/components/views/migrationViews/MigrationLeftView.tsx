import { MainColumnView } from 'components/common/MainColumnView';
import CountryFlow from 'components/indicators/migration/CountryFlow';
import { lazy } from 'react';
const OriginCountry = lazy(
  () => import('components/indicators/migration/OriginCountry'),
);
const CountryDeparted = lazy(
  () => import('components/indicators/migration/CountryDeparted'),
);
const CountryResiding = lazy(
  () => import('components/indicators/migration/CountryResiding'),
);


export default function MigrationLeftView({ dataSources }: any) {
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <CountryFlow dataSource={mainSource.id} />
      <OriginCountry dataSource={mainSource.id} />
      <CountryResiding dataSource={mainSource.id} />
      <CountryDeparted dataSource={mainSource.id} />
    </MainColumnView>
  );
}
