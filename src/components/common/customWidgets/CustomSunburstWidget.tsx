//@ts-nocheck
import { Collapse, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import ReactEchart from 'echarts-for-react'
import { useMemo, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

const useStyle = makeStyles((theme)=>({
  legendIcon:{
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: '100%'
  },
  tipsTitle:{
    fontWeight: '600',
    display: 'block'
  },
  tips:{
    display: 'block'
  }
}))

const levels = ['País de nacimiento','País del flujo inicial', 'País después de un año'] 

export default function CustomSunburstWidget({
  id,
  title,
  dataSource,
  column,
  method,
  methodParams
}:defaultCustomWidgetProps) {
  const classes = useStyle()
  const [isOpen, setIsOpen] = useState(false)
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

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
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
          <Grid xs={12} item>
            <Link href='#' onClick={handleClick}>
              <Typography className={classes.tipsTitle} variant='caption'>
                Tip:
              </Typography>
            </Link>
            <Collapse in={isOpen} unmountOnExit>
              {levels.map((d, index) =>
                <Typography className={classes.tips} key={index} variant='overline'>
                  Nivel{index+1}: {d}
                </Typography>
              )}
            </Collapse>
          </Grid>
        </Grid>
      }
    </CustomWidgetWrapper>
  )
}
