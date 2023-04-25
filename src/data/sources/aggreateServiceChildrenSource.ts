// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const AGGREATE_SERVICE_CHILDREN_SOURCE_ID = 'aggreateServiceChildrenSource';

const source = {
  id: AGGREATE_SERVICE_CHILDREN_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporserviciosNNA`,
};

export default source;
