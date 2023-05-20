export default function getSourceFilter(id: string, filters: any) {
  if (!filters[id]) {
    return null;
  }

  const { values: [_value] = null } = filters[id];
  return _value;
}
