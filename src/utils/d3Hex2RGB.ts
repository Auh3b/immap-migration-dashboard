import { color } from 'd3';
import { UNICEF_COLORS } from 'theme';

export default function d3Hex2RGB(value: number | string) {
  let colorValue: string | number;

  if (typeof value === 'string') {
    colorValue = value;
  } else {
    colorValue = UNICEF_COLORS[value];
  }

  return [...Object.values(color(colorValue)).slice(0, -1)];
}
