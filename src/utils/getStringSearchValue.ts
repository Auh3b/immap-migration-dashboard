export default function getStringSearchValue(value: string) {
  return value.split(')')[1].split('(')[0];
}
