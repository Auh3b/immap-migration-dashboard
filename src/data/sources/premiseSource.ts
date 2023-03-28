// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const PREMISE_SOURCE_ID = 'premiseSource';

const source = {
  id: PREMISE_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT * FROM shared.Premise_22032023`,
};

export default source;
