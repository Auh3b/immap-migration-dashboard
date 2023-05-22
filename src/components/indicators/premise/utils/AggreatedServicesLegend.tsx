import { Grid, Typography, makeStyles } from '@material-ui/core';
import { interpolateRdYlBu, scaleSequential } from 'd3';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', '#f03b20'],
  ['Personas atendidas ayer', '#feb24c'],
]);

const useLegendStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  legendItem: {
    gap: theme.spacing(2),
  },
  icon: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
  },
}));

export default function AggreatedServicesLegend() {
  const classes = useLegendStyle();
  const legend = Array.from(STAT_CATEGORY_COLORS);
  return (
    <Grid container item wrap='nowrap' spacing={2}>
      <Grid item xs={6} direction='column' container className={classes.root}>
        {legend.map(([title, color]) => (
          <Grid
            key={title}
            alignItems='center'
            item
            container
            className={classes.legendItem}
          >
            <span
              className={classes.icon}
              style={{ backgroundColor: color }}
            ></span>
            <Typography variant='overline'>{title}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={6} container alignItems='center'>
        <RangeDifferenceScale />
      </Grid>
    </Grid>
  );
}

const useRangeStyles = makeStyles((theme) => ({
  root: {},
  bar: {
    backgroundImage: ({ positive, neutral, negative }: any) =>
      `linear-gradient(to right, ${negative}, ${neutral}, ${positive})`,
    height: '20px',
    width: '100%',
  },
  lines: {
    '& span': {},
  },
}));

function RangeDifferenceScale() {
  const [negative, neutral, positive] = [1, 2, 3].map((a, i) =>
    scaleSequential(interpolateRdYlBu).domain([0, 2])(i),
  );
  const classes = useRangeStyles({ negative, neutral, positive });
  return (
    <Grid container item direction='column' className={classes.root}>
      <Grid item className={classes.bar}></Grid>
      <Grid
        item
        container
        justifyContent='space-between'
        alignItems='flex-start'
        className={classes.lines}
      >
        <Typography variant='overline'>Bajo</Typography>
        <Typography variant='overline'></Typography>
        <Typography variant='overline'>Alto</Typography>
      </Grid>
    </Grid>
  );
}
