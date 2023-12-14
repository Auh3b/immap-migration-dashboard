import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { CSSProperties, useCallback, useMemo } from 'react';

export default function InvertedBarChart({
  data,
  styles,
  renderer = 'svg',
  filterable,
  selectedCategories,
  onSelectedCategoriesChange,
}: {
  data: { name: string; value: number }[];
  styles?: CSSProperties;
  renderer?: 'svg' | 'canvas';
  filterable?: Boolean;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
}) {
  const labelOptions = useMemo(
    () => ({
      show: true,
      color: 'white',
      position: 'outside',
    }),
    [data],
  );

  const seriesOptions = useMemo(
    () => [
      {
        type: 'bar',
        data: data.map((d) => {
          const clonedData = { ...d };
          const disabled =
            selectedCategories.length &&
            !selectedCategories.includes(clonedData.name);
          if (disabled) {
            const disabledItem = { ...clonedData, itemStyle: { opacity: 0.5 } };
            return disabledItem;
          }

          return { ...clonedData, itemStyle: { opacity: 1 } };
        }),
        itemStyle: {
          color: 'white',
        },
        label: {
          ...labelOptions,
        },
      },
    ],
    [data, selectedCategories],
  );

  const option = useMemo(
    () => ({
      grid: {
        top: '3%',
        left: '5%',
        right: '10%%',
        bottom: '3%',
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
      series: seriesOptions,
    }),
    [data, seriesOptions],
  );

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
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
    [data, onSelectedCategoriesChange, selectedCategories],
  );

  const onEvents = {
    ...(filterable && { click: clickEvent }),
  };
  return (
    <ReactEcharts
      onEvents={onEvents}
      option={option}
      opts={{ renderer }}
      style={styles}
    />
  );
}
