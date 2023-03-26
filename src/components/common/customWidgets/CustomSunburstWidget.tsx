//@ts-nocheck
import { Collapse, Grid, Link, makeStyles, Typography, useTheme } from '@material-ui/core';
import ReactEchart from 'echarts-for-react'
import { useMemo, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

const useStyle = makeStyles((theme)=>({
  legendContainer:{
    gap: theme.spacing(0.5)
  },
  legendIcon:{
    display: 'block',
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
  const theme = useTheme()
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
      }
    },
    tooltip:{
      show: true,
      padding: [theme.spacing(0.5), theme.spacing(1)], 
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white
      },
      backgroundColor: theme.palette.other.tooltip,
      formatter({name, color, value}){
        return (
          `<span 
            style='min-width: 35px; display: flex; flex-direction: column;'
            >
             <span>${name}</span>
             <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
               <span 
                style='background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;'
                ></span>
                <span>${value}</span>
             </span>
          </span>`
        )
      }
    },
    legend: {
      show: true,
    },
  }), [theme,data])

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
        <Grid container className={classes.legendContainer}>
          {data.legend.map(({name, color}, index)=>
            <Grid container wrap='nowrap' alignItems='center' xs item key={index}>
              <span className={classes.legendIcon} style={{backgroundColor: color}}></span>
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
