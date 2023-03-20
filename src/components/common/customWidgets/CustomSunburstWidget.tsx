import ReactEchart from 'echarts-for-react'
import { useMemo } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

export default function CustomSunburstWidget({
  id,
  title,
  dataSource,
  column,
  method,
  methodParams
}:defaultCustomWidgetProps) {

  const {data, isLoading} = useWidgetFetch({
    id,
    method,
    column,
    dataSource,
    methodParams,
  })

  const option = useMemo(()=> ({
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data: data.data,
      radius: [30, '90%'],
      toolTip:{
        show: true,
        trigger: 'item'
      },
      legend: {
        data: data.legend,
        width: 200,
        left: 0
      },
      label: {
        rotate: 'tangential'
      }
    }
  }), [data])
  console.log(data)
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data && 
        <ReactEchart 
        option={option}
        />
      }
    </CustomWidgetWrapper>
  )
}
