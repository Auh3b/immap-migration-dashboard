import { useCallback, useMemo, useState } from 'react';
import ReactEcharts from './ReactEcharts';
import { UNICEF_COLORS } from 'theme';
import { useTheme } from '@material-ui/core';
import { _FilterTypes } from '@carto/react-core';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '@carto/react-redux';

export default function TreeMapChart({ data: _data, dataSource, id, filterType }:{
  data:any[]
  dataSource?: string
  id?:string
  filterType?: _FilterTypes,
}) {
  const [filteredColumns, setFilteredColumns] = useState([])
  const dispatch = useDispatch()
  const theme = useTheme();
  const series = useMemo(() => {
    const data = [..._data];
    return [
      {
        type: 'treemap',
        leafDepth: 1,
        left: 'center',
        top: 'top',
        width: '95%',
        height: '95%',
        drillDownIcon: '',
        label: {
          show: true,
          position: 'insideTopLeft',
          distance: 5,
          formatter: '{b} - {c}',
          fontFamily: 'Barlow',
          fontSize: 16,
        },
        levels: [
          { itemStyle: { gapWidth: 5 } },
          { itemStyle: { gapWidth: 1 } },
        ],
        data,
      },
    ];
  }, [_data]);

  const option = useMemo(
    () => ({
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
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
      },
      series,
    }),
    [series, theme],
  );
  const onClick = useCallback((params)=>{
    console.log(params)
    if(params?.color){
      const {data: {name, column}} = params
      dispatch(addFilter({
        id: dataSource,
        owner: id,
        type: filterType,
        values: [name],
        column,
      }))
      setFilteredColumns((prev) => {
        if(!prev.includes(column)){
          return [...prev, column]
        }
        return prev
      })

      return;
    }


    filteredColumns.forEach((column)=>{
      dispatch(removeFilter({
        owner: id,
        id: dataSource,
        column,
      }))
      setFilteredColumns((prev) => prev.filter((d)=>d !== column))
    })
  }, [series, filteredColumns])
  const onEvents = {
    click: onClick
  }
  // console.log(filteredColumns)
  return (
    <ReactEcharts
      onEvents={onEvents}
      option={option}
      opts={{ renderer: 'svg' }}
      style={{ height: 600 }}
    />
  );
}
