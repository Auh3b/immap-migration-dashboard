import { MainColumnView } from 'components/common/MainColumnView';
import DisabilityServices from 'components/indicators/premise/DisabilityServices';
import InfoLanguages from 'components/indicators/premise/InfoLanguages';
import LocationFeatures from 'components/indicators/premise/LocationFeatures';
import OrgSurveyed from 'components/indicators/premise/OrgSurveyed';
import PremiseGenderComposition from 'components/indicators/premise/PremiseGenderComposition';
import ServiceLocation from 'components/indicators/premise/ServiceLocation';
import ServiceTime from 'components/indicators/premise/ServiceTime';
import WasteManagement from 'components/indicators/premise/WasteManagement';
import ComplaintReporting from 'components/indicators/premise/ComplaintReporting';
import OtherLanguges from 'components/indicators/premise/OtherLanguges';
import ViewSourceType from '../utils/viewSourceType';

export default function PremiseLeftView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <PremiseGenderComposition dataSource={premiseSource} />
      <OrgSurveyed dataSource={premiseSource} />
      <ServiceLocation dataSource={premiseSource} />
      <LocationFeatures dataSource={premiseSource} />
      <ServiceTime dataSource={premiseSource} />
      <DisabilityServices dataSource={premiseSource} />
      <WasteManagement dataSource={premiseSource} />
      <InfoLanguages dataSource={premiseSource} />
      <OtherLanguges dataSource={premiseSource} />
      <ComplaintReporting dataSource={premiseSource} />
    </MainColumnView>
  );
}
