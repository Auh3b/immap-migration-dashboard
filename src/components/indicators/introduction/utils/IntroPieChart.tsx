import { CSSProperties, useMemo } from 'react';
import ReactEchart from 'echarts-for-react';
import { useTheme } from '@material-ui/core';

export default function IntroPieChart({
  data,
  styles,
  renderer = 'svg',
}: {
  data: { name: string; value: number }[];
  styles?: CSSProperties;
  renderer?: 'svg' | 'canvas';
}) {
  const theme = useTheme();
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
        top: '5%',
        left: 'center',
        orient: 'horizontal',
        icon: 'circle',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            formatter: '{per|{d}%}\n{b|{b}}',
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

  return <ReactEchart option={option} style={styles} />;
}
