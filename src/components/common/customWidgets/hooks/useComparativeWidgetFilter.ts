import { _FilterTypes } from '@carto/react-core';
import { selectSourceById } from '@carto/react-redux';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function useComparativeWidgetFilter({
  dataSource,
  id,
  column,
  groupId,
  type = _FilterTypes.STRING_SEARCH,
}: {
  dataSource: string;
  id?: string;
  column: string;
  type?: _FilterTypes;
  groupId?: string;
}) {
  const { filters } = useSelector(
    (state) => selectSourceById(state, dataSource) || {},
  );
  const filter = filters?.[column]?.[type];
  if (!filter) {
    return [null];
  }

  return filter.values;
}
