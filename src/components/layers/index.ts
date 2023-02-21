import HotspotsLayer from './HotspotsLayer';
import ServicePointsLayer from './ServicePointsLayer';
import MigrationFlowLayer from './MigrationFlowLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    HotspotsLayer(),
    ServicePointsLayer(),
    MigrationFlowLayer(),
    // [hygen] Add layer
  ];
};
