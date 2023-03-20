//@ts-nocheck
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ReactEchart from 'echarts-for-react'
import { useMemo } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

const useStyle = makeStyles((theme)=>({
  legendIcon:{
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: '100%'
  }
}))

export default function CustomSunburstWidget({
  id,
  title,
  dataSource,
  column,
  method,
  methodParams
}:defaultCustomWidgetProps) {
  const classes = useStyle()

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
      //@ts-ignore
      data: data.data,
      radius: [30, '90%'],
      toolTip:{
        show: true,
        trigger: 'item'
      },
      label: {
        show: false,
        rotate: 'tangential'
      }
    },
    tooltip:{
      show: true
    },
    legend: {
      show: true,
    },
  }), [data])
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data && 
        <ReactEchart 
        option={option}
        />
      }
      {data.legend &&
        <Grid container>
          {data.legend.map(({name, color}, index)=>
            <Grid container alignItems='center' xs={4} item key={index}>
              <div className={classes.legendIcon} style={{backgroundColor: color}}></div>
              <Typography variant='overline'>
                {name}
              </Typography>
            </Grid>
          )}
        </Grid>
      }
    </CustomWidgetWrapper>
  )
}
