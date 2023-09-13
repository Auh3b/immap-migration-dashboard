import { useSelector } from 'react-redux';
import { getViewMode } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';

const countries = ['chile', 'colombia', 'costa rica', 'panamá'];

export default function useIndicatorFilters({
  id,
  filters: _filters,
  source,
  viewFilter,
}: {
  id: string;
  filters: unknown;
  source: string;
  viewFilter?: string;
}) {
  // @ts-ignore
  const duelView = useSelector((state) => Boolean(getViewMode(state.media)));

  if (!_filters[source]) return {};

  const filtersBySource = _filters[source];

  const processedViewFilters = getDuelViewFilters(
    duelView,
    filtersBySource,
    viewFilter,
  );

  if (!processedViewFilters[id]) {
    return processedViewFilters;
  }

  const filters = { ...processedViewFilters };

  delete filters[id];

  return filters;
}

function getDuelViewFilters(duelView: boolean, _filters: any, view: string) {
  if (!duelView) return _filters;

  const filters = { ..._filters };

  const hasViewPrefix = (entry: string) => countries.includes(entry);
  Object.keys(filters).forEach((d) => {
    const idView = d.split('_').at(-1);
    if (!hasViewPrefix(idView)) return;
    if (idView === view) return;

    delete filters[d];
  });

  return filters;
}
