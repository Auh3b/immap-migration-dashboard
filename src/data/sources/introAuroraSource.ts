// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const INTRO_AURORA_SOURCE_ID = 'introduction_aurora_source';

const phases = {
  1: '`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023`',
};

const COLUMNS = [
  'e004_regio',
  'e07_gener',
  'e08_pais_',
  'id',
  'm01__en_t',
  'm02__en_t',
  'm03__dent',
  'm06_durant',
  'm07__en_q',
  'objectid',
  'timeunix',
  'e17__cua',
  'e19_cu',
  'geom',
];

const useIntroAuroraSource = () => (phaseIndex) => ({
  id: INTRO_AURORA_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT * FROM ${phases[phaseIndex] || phases[1]}`,
});

export default useIntroAuroraSource;
