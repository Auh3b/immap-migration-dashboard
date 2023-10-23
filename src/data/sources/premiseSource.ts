// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';
// import { useMemo } from 'react';
// import { useSelector } from 'react-redux';

const PREMISE_SOURCE_ID = SOURCE_NAMES.PREMISE_SOURCE;

const phases = {
  1: '`carto-dw-ac-4v8fnfsh.shared.services_round_1_22032023`',
  2: '`carto-dw-ac-4v8fnfsh.shared.services_round_2_18102023`',
};

const COLUMNS = [
  'id',
  'cual_ser_1',
  'geom',
  'nna_atend',
  'org_pert1',
  'org_pert2',
  'serv_dif_n',
  'serv_tipo1',
  'latitude',
  'longitude',
  'lugar_enc',
  'nna_atend',
  'org_pert',
  'ubicacion_',
  'porc_sobre',
  '"Capacidad diaria"',
  '"Personas atendidas ayer"',
  'cap_serv_l',
  'cap_serv_1',
  'tipo_alime',
  'pers_alim',
  'pers_atien',
  'serv_sal_1',
  'prom_agua_',
  'serv_agua',
  'serv_san_d',
  'serv_san_a',
  'serv_hig_d',
  'serv_hig_a',
  'serv_edu_d',
  'serv_edu_a',
  'serv_aloj',
  'serv_aloj_',
  'serv_ruta_',
  'serv_ruta1',
  'serv_psico',
  'serv_psi_1',
  'serv_trans',
  'serv_tra_1',
  'atend_serv',
  'serv_tra_2',
];

const usePremiseSource = () => {
  return (phaseIndex) => ({
    id: PREMISE_SOURCE_ID,
    type: MAP_TYPES.QUERY,
    connection: 'carto_dw',
    data: `SELECT * FROM ${phases[phaseIndex || 1]}`,
  });
};
//`SELECT * FROM shared.Premise_22032023`
//carto-dw-ac-4v8fnfsh.shared.Premise_22032023

export default usePremiseSource;
