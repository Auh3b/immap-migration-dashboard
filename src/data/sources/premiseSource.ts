// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';

const PREMISE_SOURCE_ID = SOURCE_NAMES.PREMISE_SOURCE;

const source = {
  id: PREMISE_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.Premise_22032023`,
};
//`SELECT * FROM shared.Premise_22032023`
//carto-dw-ac-4v8fnfsh.shared.Premise_22032023

export default source;
