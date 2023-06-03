import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import groupedColumns from '../utils/groupedColumns';
import TitleWrapper from 'components/common/TitleWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { useMemo } from 'react';
import { UNICEF_COLORS } from 'theme';
import { useTheme } from '@material-ui/core';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title =
  'Atención a niños, niñas y adolescentes no acompañados y separados';
const NOTE =
  'Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior';
const id = 'childrenTravelPartyComposition';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS;
const source = 'aurora'
const methodParams = {
  columns: ['cuan_nna_n', 'cuan_nna_s'],
  legend: ['Acompañados NNA', 'Separados NNA'],
  aggregateType: AggregationTypes.SUM,
};

export default function IntroChildTravelCompositition() {
  const theme = useTheme();
  const { data, isLoading} = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams
  })

  const series = useMemo(
    () => [
      {
        type: 'bar',
        data: data?.value,
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
