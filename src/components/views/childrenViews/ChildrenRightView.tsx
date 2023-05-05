import { MainColumnView } from 'components/common/MainColumnView';
import ChildDiffServicesAvailabilty from 'components/indicators/premise/ChildDiffServicesAvailabilty';
import ChildrenDiffServices from 'components/indicators/premise/ChildrenDiffServices';
import ChildrenTravelParty from 'components/indicators/premise/ChildrenTravelParty';
import ChildrenTravelPartyComposition from 'components/indicators/premise/ChildrenTravelPartyComposition';
import ChildrenUnderCare from 'components/indicators/premise/ChildrenUnderCare';

export default function ChildrenRightView({ dataSources }: any) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <ChildrenUnderCare dataSource={premiseSource} />
      <ChildDiffServicesAvailabilty dataSource={premiseSource} />
      <ChildrenDiffServices dataSource={premiseSource} />
      <ChildrenTravelParty dataSource={premiseSource} />
      <ChildrenTravelPartyComposition dataSource={premiseSource} />
    </MainColumnView>
  );
}
