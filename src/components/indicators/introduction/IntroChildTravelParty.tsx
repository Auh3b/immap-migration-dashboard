import TitleWrapper from "components/common/TitleWrapper";
import stackedBarCategories from "../utils/stackedBarCategories";
import WidgetNote from "components/common/customWidgets/WidgetNote";
import { useMemo } from "react";
import { UNICEF_COLORS } from "theme";
import { useTheme } from "@material-ui/core";
import ReactEcharts from "components/common/customCharts/ReactEcharts";

const title = 'NNA no acompañados y separados';
const NOTE =
  'Presencia de niños, niñas y adolescentes no acompañados y separados';
const id = 'childrenTravelParty';
const column = 'serv_dif_n';
const method = stackedBarCategories;
const methodParams = {
  columns: ['nna_no_aco', 'nna_separ_'],
  legend: ['No acompañados', 'Separados'],
};

export default function IntroChildTravelParty({
  data: _data
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
      name: data?.legend[0],
      type: 'bar',
      data: data?.value[0],
      itemStyle: {}
    },
    {
      name: data?.legend[1],
      type: 'bar',
      data: data?.value[1],
      itemStyle: {}
    }
  ], [data])

  const option = useMemo(()=>({
    color: [UNICEF_COLORS[0], UNICEF_COLORS[4]],
    legend:{
      icon: 'circle',
    },
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
      <ReactEcharts option={option} opts={{renderer: 'svg'}} />
      <WidgetNote note={NOTE}/>
    </TitleWrapper>
  )
}
