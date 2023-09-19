import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMediaFilter,
  removeMediaFilter,
  setViewFilter,
} from 'store/mediaSlice';
import useCustomCompareEffectAlt from './useCustomCompareEffectAlt';
import { dequal } from 'dequal';

function getIndicatorId(id: string, index: number) {
  if (typeof index !== 'number') return id;
  const list = id.split('_');
  const endIndex = list.length;
  return list.splice(0, endIndex - 1).join('_');
}

export default function useViewFilterContinuity(_id: string, index: number) {
  const dispatch = useDispatch();
  const idRef = useRef(_id);
  const filterById =
    // @ts-ignore
    useSelector((state) => state.media.filters?.meltwater?.[idRef.current]) ||
    {};

  useCustomCompareEffectAlt(
    () => {
      if (
        typeof index === 'number' &&
        !dequal(idRef.current, _id) &&
        Object.keys(filterById).length
      ) {
        dispatch(
          addMediaFilter({
            ...filterById,
            owner: _id,
          }),
        );
        dispatch(
          removeMediaFilter({
            ...filterById,
          }),
        );
        idRef.current = _id;
      }
    },
    [_id, filterById],
    dequal,
  );
}
