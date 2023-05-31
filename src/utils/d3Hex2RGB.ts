import { color } from 'd3';

const UNICEF_COLORS = [
  '#1CABE2',
  '#00833D',
  '#80BD41',
  '#FFC20E',
  '#F26A21',
  '#E2231A',
  '#961A49',
  '#6A1E74',
  '#D8D1C9',
  '#777779',
  '#2D2926',
  '#374EA2',
]

export default function d3Hex2RGB(value: number | string) {
  let colorValue: string | number;

  if (typeof value === 'string') {
    colorValue = value;
  } else {
    colorValue = UNICEF_COLORS[value];
  }

  return [...Object.values(color(colorValue)).slice(0, -1)];
}
