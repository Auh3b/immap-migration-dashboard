import LazyLoadComponent from 'components/common/LazyLoadComponent';
import ChildrenDiffServices from 'components/indicators/premise/ChildrenDiffServices';
import ChildrenTravelParty from 'components/indicators/premise/ChildrenTravelParty';
import ChildrenTravelPartyComposition from 'components/indicators/premise/ChildrenTravelPartyComposition';
import ChildrenUnderCare from 'components/indicators/premise/ChildrenUnderCare';
import { MainColumnView } from 'components/common/MainColumnView';
import { lazy } from 'react';

const PregnantWoment = lazy(
  () => import('components/indicators/dashboard/PregnantWoment'),
);

const SickPeople = lazy(
  () => import('components/indicators/dashboard/SickPeople'),
);
const SleepOutDoor = lazy(
  () => import('components/indicators/dashboard/SleepOutDoor'),
);
const RestrictedFood = lazy(
  () => import('components/indicators/dashboard/RestrictedFood'),
);

export default function DashboardRightView({
  dataSources,
}: {
  dataSources: any;
}) {
  const { mainSource, premiseSource } = dataSources;
  return (
    <LazyLoadComponent>
      <MainColumnView>
        <ChildrenDiffServices dataSource={premiseSource.id} />
        <ChildrenTravelParty dataSource={premiseSource.id} />
        <ChildrenTravelPartyComposition dataSource={premiseSource.id} />
        {/* <ChildrenUnderCare dataSource={premiseSource.id} /> */}
        {/* <SleepOutDoor dataSource={mainSource.id} />
        <RestrictedFood dataSource={mainSource.id} /> */}
        {/* <SickPeople dataSource={mainSource.id} />
        <PregnantWoment dataSource={mainSource.id} /> */}
      </MainColumnView>
    </LazyLoadComponent>
  );
}
