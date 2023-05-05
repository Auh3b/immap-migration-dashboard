// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const AGGREGATE_SERVICES_SOURCE_ID = 'aggregateServicesSource';

const source = {
  id: AGGREGATE_SERVICES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporservicios`,
};

export default source;
