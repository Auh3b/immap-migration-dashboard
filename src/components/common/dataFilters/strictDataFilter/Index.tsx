import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import CustomTab from './utils/CustomTab';
import { FilterTypes } from 'utils/filterFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Values } from './utils/strictDateFilterTypes';
import { _FilterTypes } from '@carto/react-core';
import { StateSlices } from 'utils/types';
import { addFilterFunction, removeFilterFunction } from 'utils/stateFunction';
import { Grid, Tooltip, Typography, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import getDateFilterValues from './hooks/getDateFilterValues';
import ComponentFallback from 'components/common/ComponentFallback';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid ' + grey[200],
  },
  title: {
    ...theme.typography.subtitle1,
    color: grey[600],
    width: 200,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  const state = useSelector((state: RootState) => state);
  const isActive = useMemo(
    () =>
      getDateFilterValues({
        state,
        slice: stateSlice,
        column,
        id,
        source,
        type,
      }).length,
    [state],
  );
  const onSelectionChange = useCallback(
    (event: MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue) {
        setSelected(newValue);
        //@ts-ignore
        const selectedData = data[newValue];
        const values = [selectedData.start, selectedData.end];
        dispatch(
          addFilter({
            id: source,
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
            id: source,
            owner: id,
            column,
            source,
          }),
        );
      }
    },
    [data, dispatch, source, column, addFilter, selected],
  );

  useEffect(() => {
    if (!isActive) {
      setSelected(null);
    }
  }, [isActive]);

  const title = id.replaceAll('_', ' ');

  return (
    <Grid item className={classes.root}>
      <Tooltip title={title} arrow placement='bottom'>
        <Typography className={classes.title}>{title}</Typography>
      </Tooltip>
      {isLoading && <ComponentFallback />}
      {data && (
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
      )}
    </Grid>
  );
}
