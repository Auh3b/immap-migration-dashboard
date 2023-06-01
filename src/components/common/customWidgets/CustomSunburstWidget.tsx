//@ts-nocheck
import {
  Collapse,
  Grid,
  Link,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import ReactEchart from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import useWidgetFetch from './hooks/useWidgetFetch';

const useStyle = makeStyles((theme) => ({
  legendContainer: {
    gap: theme.spacing(0.5),
  },
  legendIcon: {
    display: 'block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: '100%',
  },
  tipsTitle: {
    fontWeight: '600',
    display: 'block',
  },
  tips: {
    display: 'block',
  },
}));

const levels = [
  'País de nacimiento',
  'País después de un año',
  'País del flujo inicial',
];

export default function CustomSunburstWidget({
  id,
  title,
  dataSource,
  column,
  methodName,
  methodParams,
  actions,
}: defaultCustomWidgetProps) {
  const classes = useStyle();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: [data, legend],
    isLoading,
  } = useWidgetFetch({
    id,
    methodName,
    column,
    dataSource,
    methodParams,
  });

  const option = useMemo(
    () => ({
      grid: {
        top: '0%',
        left: '5%',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      // animation: false,
      series: {
        type: 'sunburst',
        //@ts-ignore
        data: data,
        radius: [20, '90%'],
        toolTip: {
          show: true,
          trigger: 'item',
        },
        labelLayout(params) {
          return {
            hideOverlap: true,
          };
        },
        levels: [
          {},
          {
            r0: '15%',
            r: '35%',
            label: {
              width: 50,
              overflow: 'break',
              align: 'right',
            },
            emphasis: {
              disabled: true,
            },
          },
          {
            r0: '35%',
            r: '65%',
            label: {
              width: 50,
              overflow: 'break',
              align: 'right',
            },
            emphasis: {
              disabled: true,
            },
          },
          {
            r0: '65%',
            r: '70%',
            label: {
              position: 'outside',
            },
            emphasis: {
              disabled: true,
            },
          },
        ],
      },
      tooltip: {
        show: true,
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        backgroundColor: theme.palette.other.tooltip,
        formatter({ name, color, value, data }) {
          const { level } = data;
          return `<span 
            style='min-width: 35px; display: flex; flex-direction: column;'
            >
             <span style='display: block; border-bottom: 1px solid white;'> ${level}</span>
             <span>${name}</span>
             <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
               <span 
                style='background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;'
                ></span>
                <span>${value}</span>
             </span>
          </span>`;
        },
      },
      legend: {
        show: true,
      },
    }),
    [theme, data],
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <CustomWidgetWrapper
      title={title}
      isLoading={isLoading}
      actions={[...actions]}
    >
      {data && <ReactEchart style={{ height: 600 }} option={option} />}
      {legend && (
        <Grid container className={classes.legendContainer}>
          {legend.map(({ name, color }, index) => (
            <Grid
              container
              wrap='nowrap'
              alignItems='center'
              xs
              item
              key={index}
            >
              <span
                className={classes.legendIcon}
                style={{ backgroundColor: color }}
              ></span>
              <Typography variant='overline'>{name}</Typography>
            </Grid>
          ))}
          <Grid xs={12} item>
            <Link href='#' onClick={handleClick}>
              <Typography className={classes.tipsTitle} variant='caption'>
                Tip:
              </Typography>
            </Link>
            <Collapse in={isOpen} unmountOnExit>
              {levels.map((d, index) => (
                <Typography
                  className={classes.tips}
                  key={index}
                  variant='overline'
                >
                  Nivel{index + 1}: {d}
                </Typography>
              ))}
            </Collapse>
          </Grid>
        </Grid>
      )}
    </CustomWidgetWrapper>
  );
}
