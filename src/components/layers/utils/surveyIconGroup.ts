import d3Hex2RGB from 'utils/d3Hex2RGB';

interface IconGroup {
  name: string;
  coordinatesAccessor: Function;
  filterFunction: Function;
  color: number[];
}

export type IconGroupConfig = IconGroup[];

export const iconGroupsConfig: IconGroupConfig = [
  {
    name: 'Push 1',
    coordinatesAccessor: (d: any) => [+d['lon_mon'], +d['lat_mon']],
    filterFunction: (d: any) => +d['lon_mon'] !== 999999,
    color: d3Hex2RGB(1),
  },
  {
    name: 'Push 2',
    coordinatesAccessor: (d: any) => [+d['lon_mon2'], +d['lat_mon2']],
    filterFunction: (d: any) => +d['lon_mon2'] !== 999999,
    color: d3Hex2RGB(2),
  },
  {
    name: 'Push 3',
    coordinatesAccessor: (d: any) => [+d['lon_mon3'], +d['lat_mon3']],
    filterFunction: (d: any) => +d['lon_mon3'] !== 999999,
    color: d3Hex2RGB(3),
  },
  {
    name: 'Push 4',
    coordinatesAccessor: (d: any) => [+d['lon_mon4'], +d['lat_mon4']],
    filterFunction: (d: any) => +d['lon_mon4'] !== 999999,
    color: d3Hex2RGB(4),
  },
  {
    name: 'Push 5',
    coordinatesAccessor: (d: any) => [+d['lon_mon5'], +d['lat_mon5']],
    filterFunction: (d: any) => +d['lon_mon5'] !== 999999,
    color: d3Hex2RGB(5),
  },
  {
    name: 'Push 6',
    coordinatesAccessor: (d: any) => [+d['lon_mon6'], +d['lat_mon6']],
    filterFunction: (d: any) => +d['lon_mon6'] !== 999999,
    color: d3Hex2RGB(6),
  },
  {
    name: 'Push 7',
    coordinatesAccessor: (d: any) => [+d['lon_mon7'], +d['lat_mon7']],
    filterFunction: (d: any) => +d['lon_mon7'] !== 999999,
    color: d3Hex2RGB(7),
  },
  {
    name: 'Push 8',
    coordinatesAccessor: (d: any) => [+d['lon_mon8'], +d['lat_mon8']],
    filterFunction: (d: any) => +d['lon_mon8'] !== 999999,
    color: d3Hex2RGB(0),
  },
];
