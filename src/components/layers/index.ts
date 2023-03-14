import HotspotsLayer from './HotspotsLayer';
import ServicePointsLayer from './ServicePointsLayer';
import MigrationFlowLayer from './MigrationFlowLayer';
import SurveyConcentrationsLayer from './SurveyConcentrationsLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    HotspotsLayer(),
    SurveyConcentrationsLayer(),
    ServicePointsLayer(),
    MigrationFlowLayer(),
    // MigrationFlowAlternativeLayer(),
    // [hygen] Add layer
  ];
};
