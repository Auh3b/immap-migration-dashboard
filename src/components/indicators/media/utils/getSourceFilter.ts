export default function getSourceFilter(
  id: string,
  _filters: any,
  source: string,
) {
  const filterBySource = _filters[source] || {};
  const filters = { ...filterBySource };
  if (!filters[id]) {
    return [null];
  }

  const { values } = filters[id];
  return values;
}
