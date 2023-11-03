// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/appSlice';

export const MAIN_SOURCE_ID = SOURCE_NAMES.MAIN_SOURCE;

const phases = {
  1: '`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023`',
  2: '`carto-dw-ac-4v8fnfsh.shared.aurora_round_2`',
};

const COLUMNS = [
  'id',
  'timeunix',
  'e08_pais_',
  'e10_pais_',
  'e12_pais_',
  'e14_medios',
  'm28__que',
  'm29_por_qu',
  'm30__cua',
  'long_paisn',
  'lat_paisna',
  'lon_eng',
  'lat_eng',
  'long_paisv',
  'long_paisv',
  'long_paisi',
  'lat_paisvi',
  'geom',
];

const useMainsource = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (index === 2 && !phases[index]) {
      dispatch(
        setMessage({
          text: `Ronda ${index} aún no disponible para Aurora`,
          severity: 'warning',
        }),
      );
    }
  }, [index]);

  return (phaseIndex) => {
    setIndex(phaseIndex);
    return {
      id: MAIN_SOURCE_ID,
      type: MAP_TYPES.QUERY,
      connection: 'carto_dw',
      data: `SELECT * FROM ${phases[phaseIndex] || phases[1]}`,
    };
  };
};

const source = {
  id: MAIN_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023\``,
};

export default useMainsource;
