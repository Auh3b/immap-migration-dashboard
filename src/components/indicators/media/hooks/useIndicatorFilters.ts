import { useSelector } from 'react-redux';

export default function useIndicatorFilters({ id, filters: _filters, source }: { id: string, filters: any, source: string }) {
 
  if(!_filters[source])return {}

  const filtersBySource = _filters[source]

  const filters = { ...filtersBySource };

  if (!filters[id]) {
    return filters;
  }

  delete filters[id];

  return filters;
}
