import { useTheme } from '@material-ui/core';
import { ascending, format, interpolateRdYlBu, scaleSequential } from 'd3';
import { useMemo } from 'react';
import ReactEchart from 'components/common/customCharts/ReactEcharts';
import { UNICEF_COLORS } from 'theme';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', '#D053AC'],
  ['Personas atendidas ayer', '#53D092'],
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
  'id',
];

function getDifference(primary: number = 0, secondary: number = 0) {
  return primary - secondary;
}

function getDifferenceColor(value: number) {
  return value > 0 ? UNICEF_COLORS[0] : UNICEF_COLORS[5];
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
        type: 'scatter',
        symbolSize: 15,
        encode: {
          y: 9,
          x: 8,
          itemName: DATA_DIMENSIONS[5],
        },
        itemStyle: {
          color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[8]),
        },
      },
      {
        type: 'scatter',
        symbolSize: 15,
        encode: {
          y: 9,
          x: 7,
          itemName: DATA_DIMENSIONS[5],
        },
        itemStyle: {
          color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[7]),
        },
      },
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(9);
          const dailyCapacity = api.value(7);
          const yesterdayCount = api.value(8);
          const p1 = api.coord([dailyCapacity, categoryIndex]);
          const p2 = api.coord([yesterdayCount, categoryIndex]);
          const points = [p1, p2].sort((a, b) => ascending(a[0], b[0]));
          const [x1, y1] = p1;
          const [x2, y2] = p2;
          const [x, y] = points.at(-1);
          const difference = getDifference(dailyCapacity, yesterdayCount);
          const stroke = getDifferenceColor(difference);
          const lineStyle = api.style({
            stroke,
            lineWidth: 10,
          });
          if (params?.dataIndex !== params?.dataInsideLength) {
            return {
              type: 'group',
              children: [
                {
                  type: 'line',
                  shape: {
                    x1,
                    y1,
                    x2,
                    y2,
                  },
                  style: lineStyle,
                },
              ],
            };
          }
        },
      },
    ];
  }, [data]);

  const option = useMemo(
    () => ({
      legend: {},
      title: {
        show: true,
        text: groupName,
      },
      grid: {
        left: '5%',
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
          formatter(value: string) {
            return value.split('+')[0];
          },
          hideOverlap: true,
          width: 200,
          overflow: 'break',
        },
        axisTick:{
          alignWithLabel: true,
        }
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
        trigger: 'axis',
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
        // @ts-ignore
        formatter(params) {
          const {
            data: [
              service,
              nothing,
              location,
              org,
              personas,
              orgServ,
              geom,
              capacity,
              yesterdayCount,
              id,
            ],
          } = params[0];
          const { color: color1 } = params[0];
          const { color: color2 } = params[1];
          return `<span
            style='min-width: 35px; display: flex; flex-direction: column; gap: 8px;'
            >
            <span style='display: flex; flex-direction: column;'>
              <span>Organización:</span>
              <span>${org}</span>
            </span>
            <span style='display: flex; flex-direction: column;'>
              <span>Servicio:</span>
              <span>${service}</span>
            </span>
            <span style='display: flex; align-items: center; justify-content: space-between; gap: 8px;'>
            <span style='display: flex; align-items: center; justify-content: space-between; gap: 8px;'>
              <span style='width: 10px; height: 10px; border-radius: 100%; background-color: ${color1};'></span>
                <span>Capacidad diaria</span>
              </span>
              <span>${capacity}</span>
            </span>
            <span style='display: flex; align-items: center; justify-content: space-between; gap: 8px;'>
              <span style='display: flex; align-items: center; justify-content: space-between; gap: 8px;'>
                <span style='width: 10px; height: 10px; border-radius: 100%; background-color: ${color2};'></span>
                <span >Personas atendidas ayer</span>
              </span>
              <span>${yesterdayCount}</span>
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
