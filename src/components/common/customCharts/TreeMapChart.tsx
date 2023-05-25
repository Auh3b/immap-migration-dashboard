import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from './ReactEcharts';
import { useTheme } from '@material-ui/core';
import { _FilterTypes } from '@carto/react-core';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '@carto/react-redux';
import { dequal } from 'dequal';

interface Selected {
  dataIndex: number;
  name: string;
  column: string;
  value: number;
}

export default function TreeMapChart({
  data: _data,
  dataSource,
  id,
  filterType,
}: {
  data: any[];
  dataSource?: string;
  id?: string;
  filterType?: _FilterTypes;
}) {
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [selected, setSelected] = useState<null | Selected>(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(()=>{
    if(filteredColumns.length){
      filteredColumns.forEach((column) => {
          dispatch(
            removeFilter({
              owner: id,
              id: dataSource,
              column,
            }),
          );
          setFilteredColumns((prev) => prev.filter((d) => d !== column));
        });
    }
    if(selected){
      setSelected(null);
    }
  },[_data])


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
  const onClick = useCallback(
    (params) => {
      if (params?.color) {
        const {
          data: { name, column },
          treePathInfo,
        } = params;
        const item = treePathInfo.at(-1);
        dispatch(
          addFilter({
            id: dataSource,
            owner: id,
            type: filterType,
            values: [name],
            column,
          }),
        );

        setSelected((prev) => {
          if (dequal(prev, { ...item, column })) {
            return prev;
          }
          return { ...item, column };
        });

        setFilteredColumns((prev) => {
          if (!prev.includes(column)) {
            return [...prev, column];
          }
          return prev;
        });

        return;
      }

      if (!selected) {
        return;
      }

      const { treePathInfo } = params;
      const item = treePathInfo.at(-1);
      const { name, value, column, dataIndex } = selected;

      if (dequal({ name, value, dataIndex }, item)) {
        return;
      }

      if (item?.name) {
        dispatch(
          removeFilter({
            owner: id,
            id: dataSource,
            column,
          }),
        );
        setSelected((prev) => {
          const newSelected = treePathInfo[treePathInfo.length - 1];
          const remainColumns = filteredColumns.filter((d) => d !== column);
          const currentColumn = remainColumns[remainColumns.length - 1];
          if (!newSelected.name) {
            return null;
          }
          if (!currentColumn) {
            return null;
          }
          return { ...newSelected, column: currentColumn };
        });
        setFilteredColumns((prev) => prev.filter((d) => d !== column));
        return;
      }

      filteredColumns.forEach((column) => {
        dispatch(
          removeFilter({
            owner: id,
            id: dataSource,
            column,
          }),
        );
        setFilteredColumns((prev) => prev.filter((d) => d !== column));
      });
      setSelected(null);
    },
    [series, filteredColumns, selected],
  );
  const onEvents = {
    click: onClick,
  };
  return (
    <ReactEcharts
      onEvents={onEvents}
      option={option}
      opts={{ renderer: 'canvas' }}
      style={{ height: 600 }}
    />
  );
}
