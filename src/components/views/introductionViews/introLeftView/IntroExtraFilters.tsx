import { _FilterTypes } from '@carto/react-core';
import {
  Button,
  Divider,
  Fab,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import executeIntroMethod from 'components/indicators/introduction/utils/executeIntroMethod';
import { dequal } from 'dequal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIntroFilter } from 'store/introSlice';
import { FilterTypes } from 'utils/filterFunctions';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { StateSlices } from 'utils/types';

const source = 'aurora';
const id = 'fecha_filtro';
const column = 'timeunix';

const useExtraStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
  },
}));

export default function IntroExtraFilters() {
  const classes = useExtraStyles();
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography
        variant='subtitle1'
        style={{
          textTransform: 'uppercase',
          marginBottom: 6,
          color: '#333333',
          padding: '8px 0px',
        }}
      >
        filtros adicionales
      </Typography>
      <TimeseriesFilter />
      <IntroStrictDateFilter />
    </Grid>
  );
}

function TimeseriesFilter() {
  return (
    <Grid item container direction='column' xs>
      <Typography
        variant='subtitle2'
        style={{ textTransform: 'capitalize', marginBottom: 6 }}
      >
        {id.replaceAll('_', ' ')}
      </Typography>
      <DateFilter />
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

function DateFilter() {
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

function IntroStrictDateFilter() {
  const source = 'aurora';
  const id = 'fecha_filtro';
  const column = 'timeunix';
  const type = FilterTypes.BETWEEN;
  const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

  //@ts-ignore
  const isIntroDataReady = useSelector((state) => state.intro.isIntroDataReady);
  const [data, setData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isIntroDataReady) {
      executeIntroMethod({
        source,
        methodName,
        column,
      })
        .then((data) => setData(data))
        .finally(() => setIsLoading(false));
    }
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [isIntroDataReady]);

  return (
    <StrictDateFilter
      id={id}
      source={source}
      column={column}
      type={type}
      data={data}
      stateSlice={StateSlices.INTRO}
      isLoading={isLoading}
    />
  );
}
