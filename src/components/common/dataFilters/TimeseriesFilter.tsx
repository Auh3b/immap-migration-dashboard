import { _FilterTypes } from '@carto/react-core';
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { dequal } from 'dequal';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIntroFilter } from 'store/introSlice';

interface TimeseriesFilterProps {
  source: string;
  id: string;
  column: string;
}

export function TimeseriesFilter({
  source,
  id,
  column,
}: TimeseriesFilterProps) {
  return (
    <Grid item container direction='column' xs>
      <Typography
        variant='subtitle2'
        style={{ textTransform: 'capitalize', marginBottom: 6 }}
      >
        {id.replaceAll('_', ' ')}
      </Typography>
      <DateFilter id={id} column={column} source={source} />
    </Grid>
  );
}
const useApplyFilterStyles = makeStyles((theme) => ({
  clear: {
    width: '100%',
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[800],
      color: 'white',
    },
  },
}));
function ApplyDateFilter({ onClick }: any) {
  const classes = useApplyFilterStyles();
  return (
    <Button className={classes.clear} onClick={onClick}>
      Apply
    </Button>
  );
}
function DateFilter(props: TimeseriesFilterProps) {
  const { id, source, column } = props;
  const dispatch = useDispatch();
  const [start, setStart] = useState('2023-03-06');
  const [end, setEnd] = useState('2023-04-03');
  const currentDateFilter = useRef([start, end]);

  const showToggle = useMemo(() => {
    const newDate = [start, end];
    const oldDate = currentDateFilter.current;
    if (dequal(newDate, oldDate)) {
      return false;
    }

    return true;
  }, [start, end]);

  const handleApplyFilter = useCallback(() => {
    const startUnix = new Date(start).getTime();
    const endUnix = new Date(end).getTime();
    dispatch(
      addIntroFilter({
        source,
        column,
        values: [[startUnix, endUnix]],
        owner: id,
        type: _FilterTypes.BETWEEN,
      }),
    );
    currentDateFilter.current = [start, end];
  }, [start, end]);

  return (
    <Grid container alignItems='center' direction='column' item>
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
    <Grid item style={{ width: '100%', marginBottom: '8px' }}>
      <TextField
        id={id}
        size='medium'
        label={label}
        type='date'
        defaultValue={date.current}
        onChange={handleDateChange}
      />
    </Grid>
  );
}
