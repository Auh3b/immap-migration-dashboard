import { BarWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useMemo, useState } from 'react';
import { UNICEF_COLORS } from 'theme';
import WidgetWithAlert from '../../indicators/WidgetWithAlert';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';

const useStyles = makeStyles((theme)=>({
  legendContainer:{
    gap: theme.spacing(1),
  },
  legendIcon:{
    width: '10px', 
    height: '10px', 
    borderRadius: '100%'
  }
}))

export default function CustomStackedBarWidget({
  id,
  title,
  method,
  dataSource,
  column,
  methodParams,
  stacked,
  colorMap,
  labels = {},
}: defaultCustomWidgetProps) {
  const classes = useStyles()
  const [xAxisData, setXAxisData] = useState([])
  const [yAxisData, setYAxisData] = useState([])
  const [colors, setColors] = useState([])
  const [legend, setLegend] = useState([])

  const {
    data: _data = [],
    isLoading,
    error,
  } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams
  });

  useMemo(()=>{
    if(_data.length > 0){
      setXAxisData(_data.map(d => d.name)[0])
      setYAxisData(_data.map(d => d.value)[0])
      setColors(_data.map((d) =>d.legend)[0].map((d:string,i:number)=> UNICEF_COLORS[i]))
      setLegend(_data.map(d => d.legend)[0].map((d:string, i:number) =>({name: d, color: UNICEF_COLORS[i]})))
    }

  }, [_data])

  console.log(id, _data, colors)

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} onError={error}>
      <WidgetWithAlert dataSource={dataSource}>
        {(yAxisData.length > 0 && !isLoading) && (
          <BarWidgetUI
            // selectedBars={selectedBars}
            // onSelectedBarsChange={handleSelectedBarsChange}
            stacked={stacked}
            labels={labels}
            colors={colors}
            //@ts-ignore
            xAxisData={xAxisData}
            //@ts-ignore
            yAxisData={yAxisData}
          />
        )}
        {(legend.length > 0 && !stacked)&& (
         <Grid container item>
          {legend.map(({name, color}) =>(
            <Grid container key={name} alignItems='center' className={classes.legendContainer} item>
              <span className={classes.legendIcon} style={{backgroundColor: color }}></span>
              <Typography variant='overline'>{name}</Typography>
            </Grid>
          ))}
         </Grid> 
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}
