// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const SERVICE_FEEDBACK_NNA_V2_SOURCE_ID = 'serviceFeedbackNnaV2Source';

const source = {
  id: SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporserviciosnna_v2`,
};

export default source;
