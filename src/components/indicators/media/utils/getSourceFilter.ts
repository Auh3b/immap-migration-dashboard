export default function getSourceFilter(id: string, _filters: any) {
  const filters = {..._filters}
  if (!filters[id]) {
    return [null, null];
  }

  const { values } = filters[id];
  return values;
}
