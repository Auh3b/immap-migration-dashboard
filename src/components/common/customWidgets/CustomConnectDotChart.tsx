import { useTheme } from '@material-ui/core';
import {
  ascending,
  format,
  interpolateRdYlBu,
  scaleSequential,
} from 'd3';
import { useMemo } from 'react';
import ReactEchart from 'components/common/customCharts/ReactEcharts';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', '#f03b20'],
  ['Personas atendidas ayer', '#feb24c'],
]);

const DATA_DIMENSIONS = [
  'service',
  'country',
  'region',
  'organisation',
  'personas',
  'org/service',
  'geom',
  'Capacidad diaria',
  'Personas atendidas ayer',
];

function getDifference(primary: number = 0, secondary: number = 0) {
  const diff = primary / secondary;
  if (primary >= secondary) {
    return diff;
  }

  const adjustedDiff = 1 - diff;
  return adjustedDiff * -1;
}

function getDifferenceColor(value: number) {
  const scale = scaleSequential(interpolateRdYlBu).domain([-1, 1]);
  const color = scale(value);
  return color;
}

export default function CustomConnectDotChart({ data: _data, groupName }: any) {
  const theme = useTheme();

  const data = useMemo(
    () => _data.filter((d: any) => d[2] === groupName),
    [_data],
  );

  const series = useMemo(() => {
    return [
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(5);
          const dailyCapacity = api.value(7);
          const yesterdayCount = api.value(8);
          const p1 = api.coord([dailyCapacity, categoryIndex]);
          const p2 = api.coord([yesterdayCount, categoryIndex]);
          const points = [p1, p2].sort((a, b) => ascending(a[0], b[0]));
          const [x, y] = points.at(-1);
          const difference = getDifference(dailyCapacity, yesterdayCount);
          const stroke = getDifferenceColor(difference);
          const lineStyle = api.style({
            stroke,
            lineWidth: 10,
          });
          const font = api.font({
            fontSize: 14,
            fontFamily: 'Barlow',
          });
          console.log({ dailyCapacity, yesterdayCount, difference });
          return {
            type: 'group',
            children: [
              {
                type: 'polyline',
                shape: {
                  points,
                },
                style: lineStyle,
              },
              {
                type: 'text',
                x: x + x * 0.025,
                y: y,
                style: {
                  text: format('.0%')(difference),
                  textVerticalAlign: 'middle',
                  font,
                },
              },
            ],
          };
        },
      },
      {
        type: 'scatter',
        encode: {
          y: DATA_DIMENSIONS[5],
          x: DATA_DIMENSIONS[8],
        },
        itemStyle: {
          color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[8]),
        },
      },
      {
        type: 'scatter',
        encode: {
          y: DATA_DIMENSIONS[5],
          x: DATA_DIMENSIONS[7],
        },
        itemStyle: {
          color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[7]),
        },
      },
    ];
  }, [data]);

  const option = useMemo(
    () => ({
      title: {
        show: true,
        text: groupName,
      },
      grid: {
        left: '0%',
        right: '10%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        name: 'Organización/Servicio',
        nameLocation: 'end',
        nameTextStyle: {
          fontWeight: 'bold',
          align: 'center',
          verticalAlign: 'middle',
        },
        boundaryGap: true,
        axisLabel: {
          hideOverlap: true,
          width: 200,
          overflow: 'break',
        },
      },
      xAxis: {
        type: 'value',
        name: 'Personas',
        nameGap: 30,
        nameLocation: 'middle',
        nameTextStyle: {
          align: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
        },
        axisLabel: {
          hideOverlap: true,
        },
      },
      dataset: {
        dimensions: DATA_DIMENSIONS,
        source: data,
      },
      series,
      tooltip: {
        show: true,
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        //@ts-ignore
        formatter({ data, encode }) {
          const { x: dimensionIndex } = encode;
          return `<span 
            style='min-width: 35px;  display: flex; flex-direction: column;'
            >
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Servicio</span>
              <span>${data[0]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Organización</span>
              <span>${data[3]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Personas</span>
              <span>${data[dimensionIndex]}</span>
            </span>
          </span>`;
        },
      },
    }),
    [series],
  );
  return (
    <>
      <ReactEchart
        option={option}
        style={{ height: '650px' }}
        opts={{ renderer: 'svg' }}
      />
    </>
  );
}
