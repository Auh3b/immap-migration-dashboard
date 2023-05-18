import { useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';
import { numberFormatter } from 'utils/formatter';

export default function CustomColumnChart({
  data,
  labelFormater,
}: {
  data: Record<string, string | number>[];
  labelFormater: Function;
}) {
  const theme = useTheme()
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
      tooltip:{
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 16,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
         formatter({value}: any) {
          return `<span style='padding: 16px; font-weight: bold;'>${numberFormatter(value)}</span>`;
        },
      },
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter(value: number) {
            return format('~s')(value);
          },
        },
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
  return <ReactEcharts option={option} style={{ height: 400 }} />;
}
