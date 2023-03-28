import { MainColumnView } from "components/common/MainColumnView";
import ChildrenDiffServices from "components/indicators/premise/ChildrenDiffServices";
import LocationCapacity from "components/indicators/premise/LocationCapacity";
import LocationFeatures from "components/indicators/premise/LocationFeatures";
import OrgSurveyed from "components/indicators/premise/OrgSurveyed";
import ServiceLocation from "components/indicators/premise/ServiceLocation";
import ViewSourceType from "../utils/viewSourceType";

export default function PremiseLeftView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <ServiceLocation dataSource={premiseSource} />
      <LocationFeatures dataSource={premiseSource} />
      <OrgSurveyed dataSource={premiseSource} />
      <LocationCapacity dataSource={premiseSource} />
      <ChildrenDiffServices dataSource={premiseSource} />
    </MainColumnView>
  )
}
