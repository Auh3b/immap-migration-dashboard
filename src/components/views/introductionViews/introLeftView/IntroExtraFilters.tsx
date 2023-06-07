import { _FilterTypes } from '@carto/react-core';
import { Fab, Grid, TextField, makeStyles } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors';
import { dequal } from 'dequal';
import React, { useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addIntroFilter } from 'store/introSlice';

const source = 'aurora'
const id = 'fecha_filtro'
const column = 'timeunix'

export default function IntroExtraFilters() {
  return (
    <Grid container direction='column'>
      <TimeseriesFilter />
    </Grid>
  )
}

function TimeseriesFilter(){
  return (
    <Grid item container xs>
      <DateFilter />
    </Grid>
  )
}

const useApplyFilterStyles = makeStyles((theme)=>({
    clear: {
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[800],
      color: 'white',
    },
  }
}))

function ApplyDateFilter({ onClick }: any) {
  const classes = useApplyFilterStyles();
  return (
    <Fab className={classes.clear} onClick={onClick}>
      Apply
    </Fab>
  );
}

function DateFilter({ filters }: any) {
  const dispatch = useDispatch();
  const [start, setStart] = useState('2023-02-06');
  const [end, setEnd] = useState('2023-03-03');
  const currentDateFilter = useRef([start, end]);

  const showToggle = useMemo(() => {
    const newDate = [start, end];
    const oldDate = currentDateFilter.current;
    if (dequal(newDate, oldDate)) {
      return false;
    }

    return true;
  }, [start, end]);

  const handleApplyFilter = () => {
    dispatch(
      addIntroFilter({
        source,
        column,
        values: [[start, end]],
        owner: id,
        type: _FilterTypes.BETWEEN,
      }),
    );
    currentDateFilter.current = [start, end];
  };

  return (
    <Grid container alignItems='center' item spacing={4}>
      <DatePicker id='start' label='start' value={start} setValue={setStart} />
      <DatePicker id='end' label='end' value={end} setValue={setEnd} />
      {showToggle && <ApplyDateFilter onClick={handleApplyFilter} />}
    </Grid>
  );
}

interface DatePickerProps {
  id?: string;
  value?: string;
  label?: string;
  setValue?: Function;
}

function DatePicker({ id, value, label, setValue }: DatePickerProps) {
  const date = useRef<string>(value);

  const handleDateChange = (event: any) => {
    const selectedValue = event.target.value;
    date.current = selectedValue;
    setValue(selectedValue);
  };

  return (
    <Grid item>
      <TextField
        id={id}
        label={label}
        type='date'
        defaultValue={date.current}
        onChange={handleDateChange}
      />
    </Grid>
  );
}
