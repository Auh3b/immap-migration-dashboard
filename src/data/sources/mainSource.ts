// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const MAIN_SOURCE_ID = SOURCE_NAMES.MAIN_SOURCE;

const COLUMNS = [
  'id',
  'timeunix',
  'e08_pais_',
  'e10_pais_',
  'e12_pais_',
  'e14_medios',
  'm28__que',
  'm29_por_qu',
  'm30__cua',
  'long_paisn',
  'lat_paisna',
  'lon_eng',
  'lat_eng',
  'long_paisv',
  'long_paisv',
  'long_paisi',
  'lat_paisvi',
  'geom',
];

const source = {
  id: MAIN_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023\``,
};

export default source;
