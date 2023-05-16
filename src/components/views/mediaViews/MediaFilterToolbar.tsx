import { Grid, Paper, TextField, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { format as dateFormat } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
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
  return (
    <Grid container item spacing={4}>
      <DatePicker id='start' label='start' start={[2022, 4, 12]} />
      <DatePicker id='end' label='end' start={[2023, 4, 12]} />
    </Grid>
  );
}

interface DatePickerProps {
  id?: string;
  start?: number[];
  label?: string;
}

function DatePicker({ id, start, label }: DatePickerProps) {
  const [date, setDate] = useState<string | null>(
    dateFormat(new Date(...(start as [])), 'yyyy-MM-dd'),
  );
  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };
  return (
    <Grid item>
      <TextField
        id={id}
        label={label}
        type='date'
        defaultValue={date}
        onChange={handleDateChange}
      />
    </Grid>
  );
}
