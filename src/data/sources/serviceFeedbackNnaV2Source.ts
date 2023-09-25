// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const SERVICE_FEEDBACK_NNA_V2_SOURCE_ID = 'serviceFeedbackNnaV2Source';

const COLUMNS = [
  'id',
  'timeunix',
  'm18_1',
  'm19',
  'm20',
  'm21',
  'push',
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
