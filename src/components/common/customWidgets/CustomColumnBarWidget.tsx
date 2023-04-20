import { useMemo } from 'react';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import ReactEchart from 'echarts-for-react';
import { UNICEF_COLORS } from 'theme';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';

export default function CustomColumnBarWidget({
  title,
  id,
  dataSource,
  method,
  methodParams,
  column,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
  });
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data.length > 0 && !isLoading && <ColumnBarChart data={data} />}
    </CustomWidgetWrapper>
  );
}

function ColumnBarChart({ data }: any) {
  const theme = useTheme();
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
          formatter(value: number, index: number) {
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
      series: [
        {
          type: 'bar',
          name: 'Facil',
          data: data.map(({ m14 }: any) => m14),
          stack: 'percentage',
          itemStyle: {
            color: UNICEF_COLORS[0],
          },
        },
        {
          type: 'bar',
          name: 'Deficil',
          data: data.map(({ m15 }: any) => m15),
          stack: 'percentage',
          itemStyle: {
            color: UNICEF_COLORS[4],
          },
        },
        {
          type: 'bar',
          name: 'Regular',
          data: data.map(({ m16 }: any) => m16),
          stack: 'percentage',
          itemStyle: {
            color: UNICEF_COLORS[3],
          },
        },
      ],
    }),
    [data],
  );
  return <ReactEchart option={option} style={{ height: '600px' }} />;
}
