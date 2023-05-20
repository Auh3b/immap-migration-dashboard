import { useSelector } from 'react-redux';

export default function useIndicatorFilters({ id }: { id: string }) {
  const { meltwater: _filters } = useSelector(
    //@ts-ignore
    (state) => state.media.filters,
  );

  const filters = { ..._filters };

  if (!filters) {
    return {};
  }

  if (!filters[id]) {
    return filters;
  }

  delete filters[id];

  return filters;
}
