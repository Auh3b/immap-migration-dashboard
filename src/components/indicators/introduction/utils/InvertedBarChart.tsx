import { CSSProperties, useCallback, useMemo, useState } from 'react';
import ReactEchart from 'echarts-for-react';

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
  const [showLabel, setShowLabel] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  const labelOptions = useMemo(
    () => ({
      color: 'white',
      position: 'outside',
      fontFamily: 'Barlow',
    }),
    [data, showLabel],
  );

  const seriesOptions = useMemo(
    () => [
      {
        type: 'bar',
        data: data.map(({ value }) => value),
        itemStyle: {
          color: 'white',
        },
        label: {
          show: showLabel,
          ...labelOptions,
        },
      },
    ],
    [data],
  );

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
      series: seriesOptions,
    }),
    [data],
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
    // mouseover: () => {
    //   setShowLabel(false);
    //   setShowTooltip(true);
    // },
    // mouseout: () => {
    //   setShowLabel(true);
    //   setShowTooltip(false);
    // },
  };
  return <ReactEchart option={option} opts={{ renderer }} style={styles} />;
}
