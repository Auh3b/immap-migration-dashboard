import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';

export default function useIntroCategoryChange({
  source,
  column,
  owner,
}: {
  source: string;
  column: string;
  owner: string;
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
