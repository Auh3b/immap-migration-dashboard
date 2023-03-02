//@ts-ignore
import { _getApplicableFilters as getApplicableFilters } from '@carto/react-core/';
import { selectSourceById } from '@carto/react-redux';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';

export default function useWidgetSource({
  dataSource,
  id,
}: {
  dataSource: string;
  id: string;
}) {
  const rawSource = useSelector((state) => selectSourceById(state, dataSource));

  const applicableFilters = useMemo(
    () => getApplicableFilters(rawSource?.filters, id),
    [rawSource?.filters, id],
  );

  return useCustomCompareMemo(
    rawSource && {
      ...rawSource,
      filters: applicableFilters,
    },
    deepEqual,
  );
}

function useCustomCompareMemo(value: any, isEqual: any) {
  const ref = useRef(value);

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
}
