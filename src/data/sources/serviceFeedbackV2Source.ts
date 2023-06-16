// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const SERVICE_FEEDBACK_V2_SOURCE_ID = 'serviceFeedbackV2Source';

const source = {
  id: SERVICE_FEEDBACK_V2_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporservicios_v2`,
};

export default source;
