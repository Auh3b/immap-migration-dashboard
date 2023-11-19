export const SOURCE_NAMES = {
  MAIN_SOURCE: 'main_source',
  PREMISE_SOURCE: 'premise_source',
  TIMELINE_SOURCE: 'timeline_source',
  INTRO_AURORA_SOURCE: 'introduction_aurora_source',
  INTRO_PREMISE_SOURCE: 'introduction_premise_source',
  AGG_SERVICE_SOURCE: 'aggregate_service_source',
  AGG_SERVICE_CHILDREN_SOURCE: 'aggregate_service_children_source',
  MIGRATION_FLOW_SOURCE: 'migration_flow_source',
  SERVICE_POINTS_SOURCE: 'service_point_source',
};

export const SOURCE_COORD_MAP = new Map([
  [SOURCE_NAMES.MAIN_SOURCE, ['longitude', 'latitude']],
  [SOURCE_NAMES.TIMELINE_SOURCE, ['longitude', 'latitude']],
  [SOURCE_NAMES.AGG_SERVICE_CHILDREN_SOURCE, ['lon_eng', 'lat_eng']],
  [SOURCE_NAMES.AGG_SERVICE_SOURCE, ['lon_eng', 'lat_eng']],
  [SOURCE_NAMES.MIGRATION_FLOW_SOURCE, ['longitude', 'latitude']],
  [SOURCE_NAMES.SERVICE_POINTS_SOURCE, ['longitude', 'latitude']],
  [SOURCE_NAMES.PREMISE_SOURCE, ['longitude', 'latitude']],
]);
