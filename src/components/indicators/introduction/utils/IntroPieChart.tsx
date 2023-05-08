import { CSSProperties, useCallback, useMemo, useState } from 'react';
import ReactEchart from 'components/common/customCharts/ReactEcharts';
import { useTheme } from '@material-ui/core';

export default function IntroPieChart({
  data,
  styles,
  filterable,
  selectedCategories,
  onSelectedCategoriesChange,
}: {
  data: { name: string; value: number }[];
  filterable?: Boolean;
  styles?: CSSProperties;
  renderer?: 'svg' | 'canvas';
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
}) {
  const [showLabel, setShowLabel] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const theme = useTheme();
  // Series
  const labelOptions = useMemo(
    () => ({
      formatter: '{per|{d}%}\n{b|{b}}',
      position: 'center',
      rich: {
        b: {
          //@ts-ignore
          fontFamily: theme.typography.charts.fontFamily,
          fontSize: theme.spacing(1.75),
          lineHeight: theme.spacing(1.75),
          fontWeight: 'normal',
          color: theme.palette.text.primary,
        },
        per: {
          ...theme.typography,
          fontSize: theme.spacing(3),
          lineHeight: theme.spacing(4.5),
          fontWeight: 600,
          color: theme.palette.text.primary,
        },
      },
    }),
    [theme],
  );

  const seriesOptions = useMemo(
    () => [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: showLabel,
          ...labelOptions,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
    [showLabel, labelOptions, data],
  );

  const option = useMemo(
    () => ({
      tooltip: {
        show: showTooltip,
        trigger: 'item',
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
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: '0%',
        left: '0%',
        icon: 'circle',
      },
      series: seriesOptions,
    }),
    [seriesOptions, labelOptions, showTooltip],
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
    mouseover: () => {
      setShowLabel(false);
      setShowTooltip(true);
    },
    mouseout: () => {
      setShowLabel(true);
      setShowTooltip(false);
    },
  };

  return <ReactEchart option={option} onEvents={onEvents} style={styles} />;
}
