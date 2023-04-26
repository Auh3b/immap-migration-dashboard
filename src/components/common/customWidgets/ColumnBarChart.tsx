import { useMemo } from 'react';
import ReactEchart from 'echarts-for-react';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';

export default function ColumnBarChart({ data, labels, colors, height }: any) {
  const theme = useTheme();
  const series = useMemo(() => {
    let seriesGroups: any[] = [];
    const _labels: [number, string][] = Array.from(labels);
    for (let [key, value] of _labels) {
      const seriesGroup = {
        type: 'bar',
        name: value,
        data: data.map((d: any) => d[value]),
        stack: 'percentage',
        itemStyle: {
          color: colors.get(key),
        },
      };
      seriesGroups = [...seriesGroups, seriesGroup];
    }
    return seriesGroups;
  }, [data, labels, colors]);

  const option = useMemo(
    () => ({
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        align: 'left',
        orient: 'horizontal',
        icon: 'circle',
      },
      yAxis: {
        type: 'category',
        data: data.map(({ name }: any) => name),
        boundaryGap: true,
        axisLabel: {
          hideOverlap: true,
          width: 100,
          overflow: 'break',
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          hideOverlap: true,
          width: 100,
          overflow: 'break',
          formatter(value: number) {
            return format('.0%')(value);
          },
        },
      },
      tooltip: {
        show: true,
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
        formatter({ name, color, value, data }: any) {
          return `<span 
            style='min-width: 35px; display: flex; flex-direction: column;'
            >
             <span>${name}</span>
             <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
               <span 
                style='background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;'
                ></span>
                <span>${format('.0%')(value)}</span>
             </span>
          </span>`;
        },
      },
      series,
    }),
    [series],
  );
  return <ReactEchart option={option} style={{ minHeight: '200px', maxHeight: '600px', height: height ?? '500px' }} />;
}
