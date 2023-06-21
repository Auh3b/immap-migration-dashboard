export default function getSourceFilter(
  id: string,
  _filters: any,
  source: string,
):any[] {
  const filterBySource = _filters[source] || [];
  const filters = { ...filterBySource };
  if (!filters[id]) {
    return [];
  }

  const { values } = filters[id];
  return values;
}
