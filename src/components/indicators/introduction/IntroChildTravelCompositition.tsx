import { _FilterTypes } from '@carto/react-core';
import TitleWrapper from 'components/common/TitleWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { useMemo } from 'react';
import { UNICEF_COLORS } from 'theme';
import { useTheme } from '@material-ui/core';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { SummarisationTypes } from '../utils/AggregateColumns';

const title =
  'Atención a niños, niñas y adolescentes no acompañados y separados';
const NOTE =
  'Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior';
const id = 'childrenTravelPartyComposition';
const column = 'serv_dif_n';
const methodName = EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS;
const source = 'premise';
const methodParams = {
  columns: [
    { name: 'cuan_nna_n', type: SummarisationTypes.SUM },
    { name: 'cuan_nna_s', type: SummarisationTypes.SUM },
  ],
  legend: ['Acompañados NNA', 'Separados NNA'],
};

export default function IntroChildTravelCompositition() {
  const theme = useTheme();
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });

  const data = useMemo(() => (_data.length ? _data[0] : {}), [_data]);

  const series = useMemo(
    () => [
      {
        type: 'bar',
        data: data?.value,
        barWidth: 60,
        itemStyle: {},
      },
    ],
    [data],
  );

  const option = useMemo(
    () => ({
      color: UNICEF_COLORS,
      grid: {
        top: '13%',
        left: '5%',
        right: '5%',
        bottom: '17%',
        containLabels: true,
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
        data: data?.name,
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
