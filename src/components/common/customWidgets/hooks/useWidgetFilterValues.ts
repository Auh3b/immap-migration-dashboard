import { _FilterTypes } from '@carto/react-core';
import { selectSourceById } from '@carto/react-redux';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useWidgetFilterValues({
  dataSource,
  id,
  column,
  type,
  groupId,
}: {
  dataSource: string;
  id: string;
  column: string;
  type: _FilterTypes;
  groupId?: string;
}) {
  const { filters } = useSelector(
    (state) => selectSourceById(state, dataSource) || {},
  );

  return useMemo(() => {
    const filter = filters?.[column]?.[type];
    if (!filter || filter.owner !== id) {
      return null;
    }
    return filter.values;
  }, [filters, column, type, id, groupId]);
}
