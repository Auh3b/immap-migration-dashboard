// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const SERVICE_FEEDBACK_V2_SOURCE_ID = 'serviceFeedbackV2Source';

const COLUMNS = ['id', 'timeunix', 'm12', 'm14', 'm15', 'push', 'm16', 'geom'];

const source = {
  id: SERVICE_FEEDBACK_V2_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporservicios_v2\``,
};

export default source;
