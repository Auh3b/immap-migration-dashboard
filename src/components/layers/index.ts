import HotspotsLayer from './HotspotsLayer';
import ServicePointsLayer from './ServicePointsLayer';
import MigrationFlowLayer from './MigrationFlowLayer';
import SurveyConcentrationsLayer from './SurveyConcentrationsLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    // SurveyConcentrationsLayer(),
    HotspotsLayer(),
    ServicePointsLayer(),
    MigrationFlowLayer(),
    // [hygen] Add layer
  ];
};
