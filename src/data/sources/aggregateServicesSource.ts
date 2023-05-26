// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const AGGREGATE_SERVICES_SOURCE_ID = SOURCE_NAMES.AGG_SERVICE_SOURCE;

const source = {
  id: AGGREGATE_SERVICES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporservicios`,
};

export default source;
