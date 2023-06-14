import { _FilterTypes } from '@carto/react-core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';

export default function useIntroCategoryChange({
  source,
  column,
  owner,
  type = _FilterTypes.IN,
  valueFormatter,
}: {
  source: string;
  column: string;
  owner: string;
  type?: _FilterTypes;
  valueFormatter?:Record<any, string>
}) {
  const dispatch = useDispatch();
  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        dispatch(
          addIntroFilter({
            source,
            column,
            values: categories,
            owner,
            type,
            valueFormatter,
          }),
        );
      } else {
        dispatch(
          removeIntroFilter({
            source,
            column,
            owner,
          }),
        );
      }
    },
    [column, owner, dispatch],
  );
  return handleSelectedCategoriesChange;
}
