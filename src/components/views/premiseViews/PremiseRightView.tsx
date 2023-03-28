import { MainColumnView } from 'components/common/MainColumnView';
import InfoLanguages from 'components/indicators/premise/InfoLanguages';
import OtherLanguges from 'components/indicators/premise/OtherLanguges';
import WomenDiffServices from 'components/indicators/premise/WomenDiffServices';
import ViewSourceType from '../utils/viewSourceType';

export default function PremiseRightView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <WomenDiffServices dataSource={premiseSource} />
      <InfoLanguages dataSource={premiseSource} />
      <OtherLanguges dataSource={premiseSource} />
    </MainColumnView>
  );
}
