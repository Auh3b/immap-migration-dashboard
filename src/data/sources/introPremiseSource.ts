// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const INTRO_AURORA_SOURCE_ID = 'introduction_aurora_source';

const COLUMNS = [
  'id',
  'org_pert',
  'erm',
  'sobrepasa_',
  'nna_no_aco',
  'nna_separ_',
  'cuan_nna_n',
  'cuan_nna_s',
  'princ_re_1',
  'geom',
];

const source = {
  id: INTRO_AURORA_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.premise_old_new\``,
};

export default source;
