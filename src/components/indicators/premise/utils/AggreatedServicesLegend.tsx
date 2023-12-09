import { Grid, Tooltip, Typography, makeStyles } from '@material-ui/core';
import { UNICEF_COLORS } from 'theme';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', '#D053AC'],
  ['Personas atendidas ayer', '#53D092'],
]);

const CAPACITY_COLORS = new Map([
  ['Capacidad excedente', UNICEF_COLORS[0]],
  ['Déficit de Capacidad', UNICEF_COLORS[5]],
]);

const useLegendStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  legendItem: {
    gap: theme.spacing(0.5),
  },
  icon: {
    minWidth: '10px',
    minHeight: '10px',
    borderRadius: '100%',
  },
  text: {
    ...theme.typography.overline,
    fontSize: '8px',
    flexGrow: 1,
  },
}));

export default function AggreatedServicesLegend() {
  return (
    <Grid container item wrap='nowrap' justifyContent={'space-between'}>
      <Legend colors={STAT_CATEGORY_COLORS} />
      <Legend colors={CAPACITY_COLORS} />
    </Grid>
  );
}

function Legend({ colors }: { colors: Map<string, string> }) {
  const classes = useLegendStyle();
  const legend = Array.from(colors);
  return (
    <Grid item xs={6} direction='column' container className={classes.root}>
      {legend.map(([title, color], i) => (
        <Tooltip
          key={title}
          title={title}
          arrow
          placement={i ? 'bottom' : 'top'}
        >
          <Grid
            alignItems='center'
            wrap='nowrap'
            item
            container
            className={classes.legendItem}
          >
            <Grid
              item
              className={classes.icon}
              style={{ backgroundColor: color }}
            />
            <Typography className={classes.text} noWrap>
              {title}
            </Typography>
          </Grid>
        </Tooltip>
      ))}
    </Grid>
  );
}
