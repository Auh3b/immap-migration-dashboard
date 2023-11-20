// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const SERVICE_FEEDBACK_NNA_V2_SOURCE_ID =
  SOURCE_NAMES.AGG_SERVICE_CHILDREN_SOURCE;

const COLUMNS = [
  'id',
  'timeunix',
  'm18_1',
  'm19',
  'm20',
  'm21',
  'push',
  'country_name',
  'country_code',
  'geom',
];

const source = {
  id: SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporserviciosnna_v2\``,
};

export default source;
