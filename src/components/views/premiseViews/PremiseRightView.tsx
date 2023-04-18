import { MainColumnView } from 'components/common/MainColumnView';
import EducationService from 'components/indicators/premise/EducationService';
import FoodService from 'components/indicators/premise/FoodService';
import HealthService from 'components/indicators/premise/HealthService';
import HygieneService from 'components/indicators/premise/HygieneService';

import InformationService from 'components/indicators/premise/InformationService';
import LegalServices from 'components/indicators/premise/LegalServices';

import OtherService from 'components/indicators/premise/OtherService';

import PsychologicalService from 'components/indicators/premise/PsychologicalService';
import SanitationServices from 'components/indicators/premise/SanitationServices';

import TransportService from 'components/indicators/premise/TransportService';
import WaterService from 'components/indicators/premise/WaterService';

import ViewSourceType from '../utils/viewSourceType';
import AggreatedServices from 'components/indicators/premise/AggreatedServices';

export default function PremiseRightView({ dataSources }: ViewSourceType) {
  const { premiseSource } = dataSources;
  return (
    <MainColumnView>
      {/* <AggreatedServices dataSource={premiseSource} /> */}
     

      <LegalServices dataSource={premiseSource} />
      <FoodService dataSource={premiseSource} />
      <HealthService dataSource={premiseSource} />
      <WaterService dataSource={premiseSource} />
      <SanitationServices dataSource={premiseSource} />
      <HygieneService dataSource={premiseSource} />
      <EducationService dataSource={premiseSource} />
      <InformationService dataSource={premiseSource} />
      <PsychologicalService dataSource={premiseSource} />
      <TransportService dataSource={premiseSource} />
      <OtherService dataSource={premiseSource} />
    </MainColumnView>
  );
}
