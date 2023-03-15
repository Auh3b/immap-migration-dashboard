import { addFilter, removeFilter } from '@carto/react-redux';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import { FormulaWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { makeStyles } from '@material-ui/core';

const EMPTY_ARRAY: [] = [];

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
  group: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  optionTitle: {
    display: 'block',
    color: 'rgba(44, 48, 50, 1)',
  },
}));

export default function ToggleWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
}: defaultCustomWidgetProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column,
      id,
      type: filterType,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (column, data) => {
      const map = new Map(data);
      if (column && column.length) {
        console.log(map.get(column));
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            //@ts-ignore
            values: map.get(column).variables,
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id,
          }),
        );
      }
    },
    [column, dataSource, filterType, id, dispatch],
  );

  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  // const [selected, setSelected] = useState(null);
  // console.log(data)

  // const handleAlignment = (event:any, newAlignment:any) => {
  //   handleSelectedCategoriesChange(newAlignment, data)
  //   setSelected(newAlignment);
  // };
  return (
    <WrapperWidgetUI title={title} isLoading={isLoading}>
      <ToggleButtonGroup
        className={classes.container}
        // value={selected}
        // onChange={handleAlignment}
        arial-label='text alignment'
      >
        {data &&
          data.map(([name, { label, value }], index) => {
            return (
              <ToggleButton
                disabled
                className={classes.group}
                value={name}
                key={index}
                arial-label={name}
              >
                <span className={classes.optionTitle}>{label}</span>
                <FormulaWidgetUI data={value} />
              </ToggleButton>
            );
          })}
      </ToggleButtonGroup>
    </WrapperWidgetUI>
  );
}

interface AgeType {
  label: string;
  name: string;
  value: number;
}
