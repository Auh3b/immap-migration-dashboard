// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const TIMELINE_SOURCE_ID = SOURCE_NAMES.TIMELINE_SOURCE;

const COLUMNS = [
  'timeunix',
  'dias',
  'pais_fin',
  'lon_mon',
  'lat_mon',
  'lon_mon2',
  'lat_mon2',
  'lon_mon3',
  'lat_mon3',
  'lon_mon4',
  'lat_mon4',
  'lon_mon5',
  'lat_mon5',
  'lon_mon6',
  'lat_mon6',
  'lon_mon7',
  'lat_mon7',
  'lon_mon8',
  'lat_mon8',
];

const source = {
  id: TIMELINE_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT id,${COLUMNS.join(
    ',',
  )} , geom FROM \`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023\``,
};

export default source;
