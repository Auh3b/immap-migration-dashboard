import HotspotsLayer from './HotspotsLayer';
import ServicePointsLayer from './ServicePointsLayer';
import MigrationFlowLayer from './MigrationFlowLayer';
import SurveyConcentrationsLayer from './SurveyConcentrationsLayer';
import PremiseServicesLayer from './PremiseServicesLayer';
import SurveyTimelineLayer from './SurveyTimelineLayer';
import AggregateServiceLayer from './AggregateServiceLayer';
import AggregateServicesChildrenLayer from './AggregateServicesChildrenLayer';
import ServiceConcentrationLayer from './ServiceConcentrationLayer';
import ServicioFeedback_2Layer from './ServicioFeedback_2Layer';
import ServiciFeedbackNnaLayer from './ServiciFeedbackNnaLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    HotspotsLayer(),
    PremiseServicesLayer(),
    SurveyConcentrationsLayer(),
    ServicePointsLayer(),
    MigrationFlowLayer(),
    SurveyTimelineLayer(),
    AggregateServiceLayer(),
    AggregateServicesChildrenLayer(),
    ServiceConcentrationLayer(),
    ServicioFeedback_2Layer(),
    ServiciFeedbackNnaLayer(),
    // [hygen] Add layer
  ];
};
