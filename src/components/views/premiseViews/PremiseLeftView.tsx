import { MainColumnView } from 'components/common/MainColumnView';
import ViewSourceType from '../utils/viewSourceType';
import OrgSurveyed from 'components/indicators/premise/OrgSurveyed';
import OrganisationPrincipals from 'components/indicators/premise/OrganisationPrincipals';
import ServicesProvided from 'components/indicators/premise/ServicesProvided';
import ComplaintReporting from 'components/indicators/premise/ComplaintReporting';
import WomenDiffServices from 'components/indicators/premise/WomenDiffServices';
import WomenDiffServicesAvailability from 'components/indicators/premise/WomenDiffServicesAvailability';

export default function PremiseLeftView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <OrgSurveyed dataSource={premiseSource} />
      <OrganisationPrincipals dataSource={premiseSource} />
      <ServicesProvided dataSource={premiseSource} />
      {/* <WomenDiffServicesAvailability dataSource={premiseSource} />
      <WomenDiffServices dataSource={premiseSource} />
      <ComplaintReporting dataSource={premiseSource} /> */}
    </MainColumnView>
  );
}
