import { CSSProperties, useMemo } from 'react';
import ReactEchart from 'echarts-for-react';

export default function InvertedBarChart({
  data,
  styles,
  renderer = 'svg',
}: {
  data: { name: string; value: number }[];
  styles?: CSSProperties;
  renderer: 'svg' | 'canvas';
}) {
  const option = useMemo(
    () => ({
      grid: {
        top: '0%',
        left: '5%',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: data.map(({ name }) => name),
        axisLabel: {
          color: 'white',
          fontFamily: 'Barlow',
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: {
        type: 'bar',
        data: data.map(({ value }) => value),
        itemStyle: {
          color: 'white',
        },
        label: {
          show: true,
          color: 'white',
          position: 'outside',
          fontFamily: 'Barlow',
        },
      },
    }),
    [data],
  );
  return <ReactEchart option={option} opts={{ renderer }} style={styles} />;
}
