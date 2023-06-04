import { CSSProperties, useCallback, useMemo, useState } from 'react';
import ReactEchart from 'components/common/customCharts/ReactEcharts';
import { useTheme } from '@material-ui/core';
import { sum } from 'd3';
import { SICK_CATEGORY_ABREVATIONS } from 'components/indicators/premise/utils/services';
import { EXTENDED_PALETTE_RAND } from 'theme';
import { grey } from '@material-ui/core/colors';

export default function IntroHalfPieChart({
  data: _data,
  styles,
  renderer = 'svg',
  filterable,
  selectedCategories,
  onSelectedCategoriesChange,
  labelFormatter,
}: {
  data: any[];
  styles?: CSSProperties;
  renderer?: 'svg' | 'canvas';
  filterable?: Boolean;
  selectedCategories?: string[];
  labelFormatter: (value: any) => string;
  onSelectedCategoriesChange?: Function;
}) {
  const [showLabel, setShowLabel] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  const theme = useTheme();

  const dataWithColor = useMemo(() => {
    if (_data.length) {
      const active = _data.map((d, i) => ({
        ...d,
        itemStyle: { color: EXTENDED_PALETTE_RAND[i] },
      }));
      const lastItem = {
        value: sum(_data, (d) => d.value),
        itemStyle: {
          color: 'none',
          decal: {
            symbol: 'none',
          },
        },
        label: {
          show: false,
        },
      };

      return [...active, lastItem];
    }
    return [];
  }, [_data]);

  const labelOptions = useMemo(
    () => ({
      position: 'center',
      formatter({ name, percent }: any) {
        return `{per|${percent * 2}%}\n{b|${SICK_CATEGORY_ABREVATIONS.get(
          +name,
        )}}`;
      },
      rich: {
        b: {
          //@ts-ignore
          ...theme.typography.overline,
          fontSize: theme.spacing(1.75),
          lineHeight: theme.spacing(1.75),
          fontWeight: 'normal',
          color: theme.palette.text.primary,
        },
        per: {
          ...theme.typography.overline,
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
        center: ['50%', '90%'],
        startAngle: 180,
        avoidLabelOverlap: false,
        label: {
          show: false,
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
        data: dataWithColor.map((d, i) => {
          const clonedData = { ...d };

          const disabled =
            selectedCategories.length &&
            !selectedCategories.includes(clonedData.name as any);

          const isLast = i === dataWithColor.length -1

          if (labelFormatter) {
            clonedData.name = labelFormatter(+clonedData.name) as string;
          }

          if (disabled && !isLast) {
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
    [showLabel, labelOptions, dataWithColor],
  );

  const option = useMemo(
    () => ({
      tooltip: {
        show: false,
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
        formatter(name: any) {
          return SICK_CATEGORY_ABREVATIONS.get(+name);
        },
        textStyle: {
          // width: 100,
          overflow: 'truncate',
        },
      },
      series: seriesOptions,
    }),
    [seriesOptions],
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

  return (
    <ReactEchart
      onEvents={onEvents}
      option={option}
      opts={{ renderer }}
      style={styles}
    />
  );
}
