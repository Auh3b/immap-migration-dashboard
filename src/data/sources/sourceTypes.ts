export const SOURCE_NAMES = {
  MAIN_SOURCE: 'main_source',
  PREMISE_SOURCE: 'main_source',
  TIMELINE_SOURCE: 'main_source',
  AGG_SERVICE_SOURCE: 'main_source',
  AGG_SERVICE_CHILDREN_SOURCE: 'main_source',
  MIGRATION_FLOW_SOURCE: 'main_source',
  SERVICE_POINTS_SOURCE: 'main_source',
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
