import { color } from 'd3';
import { UNICEF_COLORS } from 'theme';

export default function d3Hex2RGB(index: number) {
  return [...Object.values(color(UNICEF_COLORS[index])).slice(0, -1)];
}
