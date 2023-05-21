import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import groupedColumns from '../utils/groupedColumns';
import TitleWrapper from 'components/common/TitleWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { useMemo } from 'react';
import { UNICEF_COLORS } from 'theme';
import { useTheme } from '@material-ui/core';

const title =
  'Atención a niños, niñas y adolescentes no acompañados y separados';
const NOTE =
  'Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior';
const id = 'childrenTravelPartyComposition';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const method = groupedColumns;
const methodParams = {
  columns: ['cuan_nna_n', 'cuan_nna_s'],
  legend: ['Acompañados NNA', 'Separados NNA'],
  aggregateType: AggregationTypes.SUM,
};

export default function IntroChildTravelCompositition({
  data:_data
}: any) {
  const theme = useTheme()

  const data = useMemo(()=> {
    if(_data){
      //@ts-ignore
      return method(_data, column, methodParams)[0]
    }
  } 
  , [_data])

  const series = useMemo(()=>[
    {
      type: 'bar',
      data: data?.value,
      itemStyle: {}
    }
  ], [data])

  const option = useMemo(()=>({
    color: UNICEF_COLORS,
    tooltip:{
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
    xAxis:{
      type: 'category',
      data: data?.name,
    },
    yAxis:{
      type: 'value',
    },
    series,
  }), [series])

  return (
    <TitleWrapper title={title}>
      <ReactEcharts option={option}  opts={{renderer: 'svg'}}/>
      <WidgetNote note={NOTE}/>
    </TitleWrapper>
  )
}
