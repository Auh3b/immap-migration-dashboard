// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const SERVICE_FEEDBACK_V2_SOURCE_ID = SOURCE_NAMES.AGG_SERVICE_SOURCE;

const COLUMNS = [
  'id',
  'timeunix',
  'm12',
  'm14',
  'm15',
  'push',
  'm16',
  'country_name',
  'country_code',
  'geom',
];

const source = {
  id: SERVICE_FEEDBACK_V2_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporservicios_v2\``,
};

export default source;
