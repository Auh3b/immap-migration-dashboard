import { CSSProperties, useCallback, useMemo, useState } from 'react';
import ReactEchart from 'components/common/customCharts/ReactEcharts';
import { useTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { EXTENDED_PALETTE_RAND } from 'theme';

export default function CustomPieWidgetUI({
  data: _data,
  styles,
  filterable,
  labels,
  selectedCategories,
  onSelectedCategoriesChange,
}: {
  data: { name: string; value: number }[];
  filterable?: Boolean;
  styles?: CSSProperties;
  labels?: Record<string | number, string>;
  renderer?: 'svg' | 'canvas';
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
}) {
  const [showLabel, setShowLabel] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const theme = useTheme();
  const dataWithColor = useMemo(() => {
    if (_data.length) {
      return _data.map((d, i) => ({
        ...d,
        itemStyle: { color: EXTENDED_PALETTE_RAND[i] },
      }));
    }
    return [];
  }, [_data]);
  // Series
  const labelOptions = useMemo(
    () => ({
      formatter: '{per|{d}%}\n{b|{b}}',
      position: 'center',
      rich: {
        b: {
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
        radius: ['65%', '90%'],
        bottom: '10%',
        avoidLabelOverlap: false,
        label: {
          show: showLabel,
          ...labelOptions,
        },
        emphasis: {
          scale: false,
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: dataWithColor.map((d) => {
          const clonedData = { ...d };

          const disabled =
            selectedCategories.length &&
            !selectedCategories.includes(clonedData.name as any);

          if (labels) {
            clonedData.name = labels[+clonedData.name] || clonedData.name;
          }

          if (disabled) {
            const disabledItem = {
              ...clonedData,
              itemStyle: { color: grey[400] },
            };
            return disabledItem;
          }

          const enabledItem = { ...clonedData };

          return enabledItem;
        }),
      },
    ],
    [showLabel, labelOptions, labels, dataWithColor, selectedCategories],
  );

  const option = useMemo(
    () => ({
      color: EXTENDED_PALETTE_RAND,
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
        width: '90%',
        bottom: '3%',
        left: '4%',
        icon: 'circle',
        pageIcons: {
          horizontal: [
            'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z',
            'M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z',
          ],
        },
      },
      series: seriesOptions,
    }),
    [seriesOptions, showTooltip, theme],
  );

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const { name } = _data[params.dataIndex];

        const selectedCategoryIdx = newSelectedCategories.indexOf(name);
        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(name);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [_data, onSelectedCategoriesChange, selectedCategories],
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
