import React, { useMemo } from 'react';
import ReactEcharts from './ReactEcharts';

export default function CustomColumnChart({
  data,
  labelFormater,
}: {
  data: Record<string, string | number>[];
  labelFormater: Function;
}) {
  const series = useMemo(
    () => [
      {
        type: 'bar',
        data: data.map(({ value }) => value),
      },
    ],
    [data],
  );
  const option = useMemo(
    () => ({
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: data.map(({ name }) => name),
        axisLabel: {
          formatter(value: any) {
            if (labelFormater) {
              const label = labelFormater(value);
              return label;
            }
            return value;
          },
        },
      },
      series,
    }),
    [series],
  );
  return <ReactEcharts option={option} style={{ height: 550 }} />;
}
