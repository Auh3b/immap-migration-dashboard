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
      return [];
    }
    return filter.values.map((d: string) => {
      if (type === _FilterTypes.STRING_SEARCH) {
        const value = d.split(')')[1].split('(')[0];
        return value;
      }
      return d;
    });
  }, [filters, column, type, id, groupId]);
}
