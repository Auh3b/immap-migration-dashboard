import LazyLoadComponent from 'components/common/LazyLoadComponent';
import ChildrenDiffServices from 'components/indicators/premise/ChildrenDiffServices';
import ChildrenTravelParty from 'components/indicators/premise/ChildrenTravelParty';
import ChildrenTravelPartyComposition from 'components/indicators/premise/ChildrenTravelPartyComposition';
import { MainColumnView } from 'components/common/MainColumnView';

export default function DashboardRightView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { premiseSource } = dataSources;
  return (
    <LazyLoadComponent>
      <MainColumnView>
        <ChildrenDiffServices dataSource={premiseSource.id} />
        <ChildrenTravelParty dataSource={premiseSource.id} />
        <ChildrenTravelPartyComposition dataSource={premiseSource.id} />
      </MainColumnView>
    </LazyLoadComponent>
  );
}
