import { MouseEvent, useCallback, useState } from 'react';
import CustomTab from './utils/CustomTab';
import { FilterTypes } from 'utils/filterFunctions';
import { useDispatch } from 'react-redux';
import { Values } from './utils/strictDateFilterTypes';
import { _FilterTypes } from '@carto/react-core';
import { StateSlices } from 'utils/types';
import { addFilterFunction, removeFilterFunction } from 'utils/stateFunction';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

type DateFilter = Record<string, Values>;

interface StrictDataFilterProps {
  id: string;
  column: string;
  data: DateFilter;
  isLoading?: boolean;
  source: string;
  stateSlice: StateSlices;
  type: _FilterTypes | FilterTypes;
}

export default function StrictDateFilter({
  id,
  column,
  data,
  isLoading,
  source,
  stateSlice,
  type,
}: StrictDataFilterProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string | null>(null);
  const addFilter = addFilterFunction[stateSlice];
  const removeFilter = removeFilterFunction[stateSlice];
  const onSelectionChange = useCallback(
    (event: MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue) {
        setSelected(newValue);
        //@ts-ignore
        const selectedData = data[newValue];
        const values = [selectedData.start, selectedData.end];
        dispatch(
          addFilter({
            owner: id,
            column,
            source,
            type,
            values: [values],
          }),
        );
      } else {
        setSelected(null);
        dispatch(
          removeFilter({
            owner: id,
            column,
            source,
          }),
        );
      }
    },
    [data, dispatch, addFilter, selected],
  );

  return (
    <>
      {data && !isLoading ? (
        <Grid item className={classes.root}>
          <CustomTab
            id={id}
            column={column}
            source={source}
            type={type}
            addFilter={addFilter}
            removeFilter={removeFilter}
            values={data}
            size={'medium'}
            exclusive
            selected={selected}
            onSelectionChange={onSelectionChange}
          />
        </Grid>
      ) : null}
    </>
  );
}
