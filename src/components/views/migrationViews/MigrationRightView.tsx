import { lazy } from 'react';
import { MainColumnView } from 'components/common/MainColumnView';

const TransitStopReason = lazy(
  () => import('components/indicators/migration/TransitStopReason'),
);
const TransitStopLength = lazy(
  () => import('components/indicators/migration/TransitStopLength'),
);
const TransitInfomation = lazy(
  () => import('components/indicators/migration/TransitInfomation'),
);
const TransportMode = lazy(
  () => import('components/indicators/migration/TransportMode'),
);

export default function MigrationRightView({ dataSources }: any) {
  const { mainSource } = dataSources;
  return (
    <MainColumnView>
      <TransitStopReason dataSource={mainSource.id} />
      <TransitStopLength dataSource={mainSource.id} />
      <TransitInfomation dataSource={mainSource.id} />
      <TransportMode dataSource={mainSource.id} />
    </MainColumnView>
  );
}
