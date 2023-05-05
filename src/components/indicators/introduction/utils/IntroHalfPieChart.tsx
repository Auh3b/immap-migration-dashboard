import { CSSProperties, useMemo } from 'react';
import ReactEchart from 'echarts-for-react';
import { useTheme } from '@material-ui/core';
import { sum } from 'd3';

export default function IntroHalfPieChart({
  data: _data,
  styles,
  renderer = 'svg',
}: {
  data: any[];
  styles?: CSSProperties;
  renderer?: 'svg' | 'canvas';
}) {
  const theme = useTheme();
  const data = useMemo(() => {
    if (_data.length > 0) {
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

      return [..._data, lastItem];
    }
    return [];
  }, [_data]);
  const option = useMemo(
    () => ({
      tooltip: {
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
        textStyle: {
          // width: 100,
          overflow: 'truncate',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '90%'],
          startAngle: 180,
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            formatter({ name, value }: any) {
              return `{per|${value}}\n{b|${name}}`;
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
    }),
    [data],
  );

  return (
    <>
      {data && (
        <ReactEchart option={option} opts={{ renderer }} style={styles} />
      )}
    </>
  );
}
