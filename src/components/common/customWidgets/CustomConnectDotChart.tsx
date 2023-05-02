import { useTheme } from '@material-ui/core';
import { ascending } from 'd3';
import { useMemo } from 'react';
import { UNICEF_COLORS } from 'theme';
import ReactEchart from 'echarts-for-react';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', UNICEF_COLORS[5]],
  ['Personas atendidas ayer', UNICEF_COLORS[4]],
  ['Promedio diario', UNICEF_COLORS[0]],
]);

export default function CustomConnectDotChart({ data: _data, groupName }: any) {
  const theme = useTheme();
  const DATA_DIMENSIONS = [
    'service',
    'country',
    'region',
    'organisation',
    'personas',
    'org/service',
    'Capacidad diaria',
    'Personas atendidas ayer',
    'Promedio diario',
  ];

  const data = useMemo(
    () => _data.filter((d: any) => d[2] === groupName),
    [_data],
  );

  const option = useMemo(
    () => ({
      title: {
        show: true,
        text: groupName,
      },
      grid: {
        left: '5%',
        right: '4%',
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
      series: [
        {
          type: 'custom',
          renderItem: (params: any, api: any) => {
            const categoryIndex = api.value(5);
            const p1 = api.coord([api.value(6), categoryIndex]);
            const p2 = api.coord([api.value(7), categoryIndex]);
            const p3 = api.coord([api.value(8), categoryIndex]);
            const points = [p1, p2, p3].sort((a, b) => ascending(a[0], b[0]));
            return {
              type: 'polyline',
              shape: {
                points,
              },
              style: api.style({
                stroke: UNICEF_COLORS[6],
              }),
            };
          },
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[6],
          },
          itemStyle: {
            color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[6]),
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
      ],
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
    [data],
  );
  return (
    <ReactEchart
      option={option}
      style={{ height: '600px' }}
      opts={{ renderer: 'svg' }}
    />
  );
}
