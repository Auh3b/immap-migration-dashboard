// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const INTRO_AURORA_SOURCE_ID = 'introduction_premise_source';

const phases = {
  1: '`carto-dw-ac-4v8fnfsh.shared.services_round_1_22032023`',
  2: '`carto-dw-ac-4v8fnfsh.shared.services_round_2_18102023`',
};

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

const useIntroPremiseSource = () => (phaseIndex: number | null) => ({
  id: INTRO_AURORA_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT * FROM ${phases[phaseIndex] || phases[1]}`,
});

export default useIntroPremiseSource;
