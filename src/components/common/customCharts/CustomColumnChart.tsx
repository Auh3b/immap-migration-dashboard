import { CSSProperties, useCallback, useMemo, useState } from 'react';
import ReactEcharts from './ReactEcharts';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';
import { numberFormatter } from 'utils/formatter';
import { UNICEF_COLORS } from 'theme';
import { grey } from '@material-ui/core/colors';

export default function CustomColumnChart({
  data,
  labelFormater,
  onSelectedCategory,
  selectedCategory,
}: {
  data: Record<string, string | number>[];
  onSelectedCategory?: (args: any) => void;
  selectedCategory?: string;
  labelFormater: Function;
}) {
  const theme = useTheme();

  const chartStyle: Partial<CSSProperties> = useMemo(
    () => ({
      height: 400, //data.length ? data.length * theme.spacing(5) : theme.spacing(2)
    }),
    [data, theme],
  );

  const label = useMemo(
    () => ({
      show: true,
      align: 'left',
      verticalAlign: 'middle',
      position: 'right',
      formatter({ value }: any) {
        return format('.2s')(value);
      },
    }),
    [data],
  );

  const selectionOptions = useMemo(
    () => ({
      itemStyle: {
        color: selectedCategory ? grey[400] : UNICEF_COLORS[0],
      },
      selectedMode: 'single',
      select: {
        label: {
          fontWeight: 'bold',
        },
        itemStyle: {
          color: UNICEF_COLORS[5],
          borderWidth: 0,
        },
      },
    }),
    [selectedCategory],
  );

  const series = useMemo(
    () => [
      {
        type: 'bar',
        data,
        label,
        barMaxWidth: (chartStyle.height as number) * 0.1,
        ...selectionOptions,
      },
    ],
    [data, selectionOptions, label],
  );

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
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
        formatter(params: any) {
          const { value } = params[0];
          return `<span style='padding: 16px; font-weight: bold;'>${numberFormatter(
            value,
          )}</span>`;
        },
      },
      grid: {
        top: '10%',
        left: '5%',
        right: '10%',
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
        axisTick: {
          show: false,
        },
      },
      series,
    }),
    [series],
  );

  const click = useCallback(
    (params) => {
      const {
        data: { name },
      } = params;
      if (!onSelectedCategory) return;

      let selected: string = selectedCategory;

      if (selected === name) {
        onSelectedCategory('');
        return;
      }

      onSelectedCategory(name);
    },
    [data, onSelectedCategory, selectedCategory],
  );

  const onEvents = {
    click,
  };

  return (
    <ReactEcharts onEvents={onEvents} option={option} style={chartStyle} />
  );
}
