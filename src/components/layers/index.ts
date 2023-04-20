import HotspotsLayer from './HotspotsLayer';
import ServicePointsLayer from './ServicePointsLayer';
import MigrationFlowLayer from './MigrationFlowLayer';
import SurveyConcentrationsLayer from './SurveyConcentrationsLayer';
import PremiseServicesLayer from './PremiseServicesLayer';
import SurveyTimelineLayer from './SurveyTimelineLayer';
import AggregateServiceLayer from './AggregateServiceLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    HotspotsLayer(),
    SurveyConcentrationsLayer(),
    ServicePointsLayer(),
    MigrationFlowLayer(),
    PremiseServicesLayer(),
    SurveyTimelineLayer(),
    AggregateServiceLayer(),
    // [hygen] Add layer
  ];
};
