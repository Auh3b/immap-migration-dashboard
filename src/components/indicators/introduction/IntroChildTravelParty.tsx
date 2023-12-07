import TitleWrapper from 'components/common/TitleWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { useMemo } from 'react';
import { UNICEF_COLORS } from 'theme';
import { useTheme } from '@material-ui/core';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'NIÑOS, NIÑAS Y ADOLESCENTES NO ACOMPAÑADOS Y SEPARADOS';
const NOTE =
  'Presencia de niños, niñas y adolescentes no acompañados y separados';
const id = 'nna_viajes_fiesta';
const column = 'serv_dif_n';
const methodName = EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES;
const source = 'premise';
const methodParams = {
  columns: ['nna_no_aco', 'nna_separ_'],
  legend: ['No acompañados', 'Separados'],
};

export default function IntroChildTravelParty() {
  const theme = useTheme();

  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });

  const data: any = useMemo(() => (_data.length ? _data[0] : {}), [_data]);

  const series = useMemo(() => {
    if (Object.keys(data).length) {
      return [
        {
          name: data?.legend[0],
          type: 'bar',
          data: data?.value[0],
          itemStyle: {},
        },
        {
          name: data?.legend[1],
          type: 'bar',
          data: data?.value[1],
          itemStyle: {},
        },
      ];
    }

    return [];
  }, [data]);

  const option = useMemo(
    () => ({
      color: [UNICEF_COLORS[0], UNICEF_COLORS[4]],
      grid: {
        top: '5%',
        left: '5%',
        right: '5%',
        containLabels: true,
      },
      legend: {
        icon: 'circle',
        bottom: '0%',
        left: '5%',
        orient: 'vertical',
      },
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
      },
      xAxis: {
        type: 'category',
        data: data?.name || [],
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
      },
      series,
    }),
    [series],
  );

  return (
    <TitleWrapper title={title} isLoading={isLoading}>
      <ReactEcharts option={option} opts={{ renderer: 'svg' }} />
      <WidgetNote note={NOTE} />
    </TitleWrapper>
  );
}
