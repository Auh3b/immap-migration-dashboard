import { MainColumnView } from 'components/common/MainColumnView';

import ViewSourceType from '../utils/viewSourceType';
import AggreatedServices from 'components/indicators/premise/AggreatedServices';

export default function PremiseRightView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <AggreatedServices dataSource={premiseSource} />
    </MainColumnView>
  );
}
