import { BarWidgetUI } from '@carto/react-ui';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useMemo, useState } from 'react';
import WidgetWithAlert from '../../indicators/WidgetWithAlert';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import CustomWidgetWrapper from './CustomWidgetWrapper';

const useStyles = makeStyles((theme) => ({
  legendContainer: {
    gap: theme.spacing(1),
  },
  legendIcon: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
  },
}));

export default function CustomStackedBarWidget({
  id,
  title,
  method,
  dataSource,
  column,
  methodParams,
  stacked,
  xAxisFormatter = (value: string) => value,
  colorMap,
  labels,
}: defaultCustomWidgetProps) {
  const classes = useStyles();
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [colors, setColors] = useState([]);

  const {
    data: _data = [],
    isLoading,
    error,
  } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
  });

  useMemo(() => {
    if (_data.length > 0) {
      setXAxisData(_data.map((d) => d.name)[0]);
      setYAxisData(_data.map((d) => d.value)[0]);
      setColors(_data.map((d) => d.color)[0]);
      return;
    }
    setXAxisData([]);
    setYAxisData([]);
    setColors([]);
  }, [_data]);

  const legend: { name: string; color: string }[] = useMemo(() => {
    if(_data.length === 0){
      return [];
    }

    if(colors.length === 0){
      return []
    }
    return _data
      .map((d) => d.legend)[0]
      .map((d: string, i: number) => ({
        name: d,
        color: colors[i],
      }));

  }, [_data, colors]);

  console.log(id, _data, yAxisData)

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading} onError={error}>
      <WidgetWithAlert dataSource={dataSource}>
        {yAxisData.length > 0 && !isLoading && (
          <BarWidgetUI
            stacked={stacked}
            labels={labels}
            colors={colors}
            series={stacked ? labels : legend.map(({ name }) => name) || []}
            //@ts-ignore
            xAxisData={xAxisData}
            //@ts-ignore
            yAxisData={yAxisData}
            xAxisFormatter={stacked ? xAxisFormatter : (value: string) => ''}
          />
        )}
        {legend.length > 0 && !stacked && (
          <Grid container item>
            {legend.map(({ name, color }) => (
              <Grid
                container
                key={name}
                alignItems='center'
                className={classes.legendContainer}
                item
              >
                <span
                  className={classes.legendIcon}
                  style={{ backgroundColor: color }}
                ></span>
                <Typography variant='overline'>{name}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </WidgetWithAlert>
    </CustomWidgetWrapper>
  );
}
