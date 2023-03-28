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
const TransportMode = lazy(
  () => import('components/indicators/migration/TransportMode'),
);

export default function MigrationLeftView({ dataSources }: any) {
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <CountryFlow dataSource={mainSource.id} />
      <OriginCountry dataSource={mainSource.id} />
      <CountryDeparted dataSource={mainSource.id} />
      <CountryResiding dataSource={mainSource.id} />
      <TransportMode dataSource={mainSource.id} />
    </MainColumnView>
  );
}
