import { MainColumnView } from 'components/common/MainColumnView';
import ViewSourceType from '../utils/viewSourceType';
import OrgSurveyed from 'components/indicators/premise/OrgSurveyed';
import OrganisationPrincipals from 'components/indicators/premise/OrganisationPrincipals';
import ServicesProvided from 'components/indicators/premise/ServicesProvided';

export default function PremiseLeftView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      <OrgSurveyed dataSource={premiseSource} />
      <OrganisationPrincipals dataSource={premiseSource} />
      <ServicesProvided dataSource={premiseSource} />
    </MainColumnView>
  );
}
