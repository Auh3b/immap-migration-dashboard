import { CSSProperties, useCallback, useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';
import { numberFormatter } from 'utils/formatter';
import { UNICEF_COLORS } from 'theme';
import { grey } from '@material-ui/core/colors';

export default function CustomColumnChart({
  data,
  labelFormater,
  onSelectedCategoriesChange,
  selectedCategories,
  filterable,
}: {
  data: { name: string; value: number }[];
  onSelectedCategoriesChange?: (args: any) => void;
  selectedCategories?: string[];
  labelFormater: Function;
  filterable?: Boolean;
}) {
  const theme = useTheme();

  const chartStyle: Partial<CSSProperties> = useMemo(
    () => ({
      height: 400,
    }),
    [],
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
    [],
  );

  const series = useMemo(
    () => [
      {
        type: 'bar',
        data: data.map((d) => {
          const clonedData = { ...d };
          const disabled =
            selectedCategories.length &&
            !selectedCategories.includes(clonedData.name);
          if (disabled) {
            const disabledItem = {
              ...clonedData,
              itemStyle: { color: grey[400] },
            };
            return disabledItem;
          }

          return { ...clonedData, itemStyle: { color: UNICEF_COLORS[0] } };
        }),
        label,
        barMaxWidth: 40,
      },
    ],
    [data, selectedCategories, label],
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
    [series, data, labelFormater, theme],
  );

  const click = useCallback(
    (params) => {
      if (onSelectedCategoriesChange && filterable) {
        const newSelectedCategories = [...selectedCategories];
        const { name } = data[params.dataIndex];

        const selectedCategoryIdx = newSelectedCategories.indexOf(name);
        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(name);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [data, onSelectedCategoriesChange, selectedCategories, filterable],
  );

  const onEvents = {
    click,
  };

  return (
    <ReactEcharts onEvents={onEvents} option={option} style={chartStyle} />
  );
}
