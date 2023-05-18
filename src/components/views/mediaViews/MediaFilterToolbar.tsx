import { Fab, Grid, Paper, TextField, makeStyles } from '@material-ui/core';
import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMediaFilter } from 'store/mediaSlice';
import { _FilterTypes } from '@carto/react-core';
import { dequal } from 'dequal';
import { UNICEF_COLORS } from 'theme';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  clear: {
    backgroundColor: UNICEF_COLORS[4],
    color: 'white',
    '&:hover': {
      backgroundColor: UNICEF_COLORS[4],
      color: 'white',
    },
  },
}));

export default function MediaFilterToolbar() {
  const classes = useStyles();
  return (
    <Paper variant='outlined' className={classes.root}>
      <Grid container item>
        <DateFilter />
      </Grid>
    </Paper>
  );
}

function DateFilter() {
  const dispatch = useDispatch();
  const [start, setStart] = useState('2022-05-12');
  const [end, setEnd] = useState('2023-05-12');
  const currentDateFilter = useRef([start, end]);

  const showToggle = useMemo(() => {
    const newDate = [start, end];
    const oldDate = currentDateFilter.current;
    if (dequal(newDate, oldDate)) {
      return false;
    }

    return true;
  }, [start, end, currentDateFilter.current]);

  const handleApplyFilter = () => {
    dispatch(
      addMediaFilter({
        source: 'meltwater',
        column: 'date',
        values: [[start, end]],
        owner: 'dateFilter',
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

function ApplyDateFilter({ onClick }: any) {
  const classes = useStyles();
  return (
    <Fab className={classes.clear} onClick={onClick}>
      Apply
    </Fab>
  );
}
