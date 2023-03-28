import { MainColumnView } from "components/common/MainColumnView";
import ChildrenDiffServices from "components/indicators/premise/ChildrenDiffServices";
import ChildrenTravelParty from "components/indicators/premise/ChildrenTravelParty";
import ChildrenTravelPartyComposition from "components/indicators/premise/ChildrenTravelPartyComposition";
import ChildrenUnderCare from "components/indicators/premise/ChildrenUnderCare";
import ComplaintReporting from "components/indicators/premise/ComplaintReporting";
import DisabilityServices from "components/indicators/premise/DisabilityServices";
import LocationCapacity from "components/indicators/premise/LocationCapacity";
import LocationFeatures from "components/indicators/premise/LocationFeatures";
import OrgSurveyed from "components/indicators/premise/OrgSurveyed";
import ServiceLocation from "components/indicators/premise/ServiceLocation";
import WasteManagement from "components/indicators/premise/WasteManagement";
import ViewSourceType from "../utils/viewSourceType";

export default function PremiseLeftView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <ServiceLocation dataSource={premiseSource} />
      <LocationFeatures dataSource={premiseSource} />
      <OrgSurveyed dataSource={premiseSource} />
      <DisabilityServices dataSource={premiseSource} />
      <WasteManagement dataSource={premiseSource} />
      <ComplaintReporting dataSource={premiseSource} />
      <ChildrenUnderCare dataSource={premiseSource} />
      <LocationCapacity dataSource={premiseSource} />
      <ChildrenDiffServices dataSource={premiseSource} />
      <ChildrenTravelParty dataSource={premiseSource}/>
      <ChildrenTravelPartyComposition dataSource={premiseSource} />
    </MainColumnView>
  )
}
