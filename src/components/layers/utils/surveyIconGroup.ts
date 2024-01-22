import d3Hex2RGB from 'utils/d3Hex2RGB';

interface IconGroup {
  name: string;
  coordinatesAccessor: Function;
  filterFunction: Function;
  color: number[];
}

export type IconGroupConfig = IconGroup[];

export function getIconGroupConfig(round: number): IconGroupConfig {
  let output = [];
  const length = round == 2 ? 13 : 8;
  for (let i = 0; i < length; i++) {
    const lat = `lat_mon${i || ''}`;
    const lon = `lon_mon${i || ''}`;
    const push = i ? `Push ${i}` : 'Enganche';
    const newEntry = {
      name: push,
      coordinatesAccessor: (d: any) => [+d[lon], +d[lat]],
      filterFunction: (d: any) => +d[lon] !== 999999,
      color: d3Hex2RGB(i),
    };

    output = [...output, newEntry];
  }
  console.log(output);

  return output;
}

export const iconGroupsConfig = [
  {
    name: 'Enganche',
    coordinatesAccessor: (d: any) => [+d['lon_mon'], +d['lat_mon']],
    filterFunction: (d: any) => +d['lon_mon'] !== 999999,
    color: d3Hex2RGB(0),
  },
  {
    name: 'Push 1',
    coordinatesAccessor: (d: any) => [+d['lon_mon2'], +d['lat_mon2']],
    filterFunction: (d: any) => +d['lon_mon2'] !== 999999,
    color: d3Hex2RGB(2),
  },
  {
    name: 'Push 2',
    coordinatesAccessor: (d: any) => [+d['lon_mon3'], +d['lat_mon3']],
    filterFunction: (d: any) => +d['lon_mon3'] !== 999999,
    color: d3Hex2RGB(3),
  },
  {
    name: 'Push 3',
    coordinatesAccessor: (d: any) => [+d['lon_mon4'], +d['lat_mon4']],
    filterFunction: (d: any) => +d['lon_mon4'] !== 999999,
    color: d3Hex2RGB(4),
  },
  {
    name: 'Push 4',
    coordinatesAccessor: (d: any) => [+d['lon_mon5'], +d['lat_mon5']],
    filterFunction: (d: any) => +d['lon_mon5'] !== 999999,
    color: d3Hex2RGB(5),
  },
  {
    name: 'Push 5',
    coordinatesAccessor: (d: any) => [+d['lon_mon6'], +d['lat_mon6']],
    filterFunction: (d: any) => +d['lon_mon6'] !== 999999,
    color: d3Hex2RGB(6),
  },
  {
    name: 'Push 6',
    coordinatesAccessor: (d: any) => [+d['lon_mon7'], +d['lat_mon7']],
    filterFunction: (d: any) => +d['lon_mon7'] !== 999999,
    color: d3Hex2RGB(7),
  },
  {
    name: 'Push 7',
    coordinatesAccessor: (d: any) => [+d['lon_mon8'], +d['lat_mon8']],
    filterFunction: (d: any) => +d['lon_mon8'] !== 999999,
    color: d3Hex2RGB(8),
  },
  {
    name: 'Push 8',
    coordinatesAccessor: (d: any) => [+d['lon_mon9'], +d['lat_mon9']],
    filterFunction: (d: any) => +d['lon_mon9'] !== 999999,
    color: d3Hex2RGB(9),
  },
  {
    name: 'Push 9',
    coordinatesAccessor: (d: any) => [+d['lon_mon10'], +d['lat_mon10']],
    filterFunction: (d: any) => +d['lon_mon10'] !== 999999,
    color: d3Hex2RGB(10),
  },
  {
    name: 'Push 10',
    coordinatesAccessor: (d: any) => [+d['lon_mon11'], +d['lat_mon11']],
    filterFunction: (d: any) => +d['lon_mon11'] !== 999999,
    color: d3Hex2RGB(11),
  },
  {
    name: 'Push 11',
    coordinatesAccessor: (d: any) => [+d['lon_mon12'], +d['lat_mon12']],
    filterFunction: (d: any) => +d['lon_mon12'] !== 999999,
    color: d3Hex2RGB(12),
  },
];
