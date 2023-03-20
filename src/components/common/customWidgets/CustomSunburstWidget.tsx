import ReactEchart from 'echarts-for-react'
import { useMemo } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

const data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
];

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
      data: data,
      radius: [30, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  }), [data])
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
