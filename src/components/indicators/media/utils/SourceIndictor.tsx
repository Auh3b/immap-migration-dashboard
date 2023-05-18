import { FormulaWidgetUI } from '@carto/react-ui';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { UNICEF_COLORS } from 'theme';
import { numberFormatter } from 'utils/formatter';

interface SourceIndictorProps {
  title: string;
  data: number;
  icon?: ReactNode;
  formatter?: Function;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary.light,
    fontSize: theme.spacing(2.5),
    textTransform: 'uppercase',
  },
  icon: {
    height: '100%',
    '& .svg-inline--fa': {
      height: theme.spacing(3),
    },
  },
  value: {
    '&  span': {
      color: `${UNICEF_COLORS[0]} !important`,
    },
  },
}));

export default function SourceIndictor({
  title: _title,
  data,
  icon,
  formatter = numberFormatter,
}: SourceIndictorProps) {
  const classes = useStyles();
  const title = _title === 'all' ? 'news' : _title;
  return (
    <Grid item className={classes.root}>
      <Paper variant='outlined' className={classes.paper}>
        <Grid spacing={2} wrap='nowrap' container alignItems='center'>
          <Grid item className={classes.icon}>
            {icon}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>
              {title.replaceAll('_', ' ')}
            </Typography>
            <span className={classes.value}>
              <FormulaWidgetUI data={data} formatter={formatter} />
            </span>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
