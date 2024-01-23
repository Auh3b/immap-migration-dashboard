// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { SOURCE_NAMES } from './sourceTypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/appSlice';

export const AGGREATE_SERVICE_CHILDREN_SOURCE_ID =
  SOURCE_NAMES.AGG_SERVICE_CHILDREN_SOURCE;

const phases = {
  1: '`carto-dw-ac-4v8fnfsh.shared.kuerydesagregadoporserviciosNNA`',
  2: '`carto-dw-ac-4v8fnfsh.shared.feedback_nna_round_2`',
};

const useAggregateChildrenSource = () => {
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
      id: AGGREATE_SERVICE_CHILDREN_SOURCE_ID,
      type: MAP_TYPES.QUERY,
      connection: 'carto_dw',
      data: `SELECT * FROM ${phases[phaseIndex] || phases[1]}`,
    };
  };
};

export default useAggregateChildrenSource;
