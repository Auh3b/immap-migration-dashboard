import { Grid, Typography, makeStyles } from '@material-ui/core';
import { UNICEF_COLORS } from 'theme';

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', '#D053AC'],
  ['Personas atendidas ayer', '#53D092'],
]);

const CAPACITY_COLORS = new Map([
  ['Capacidad excedente',UNICEF_COLORS[0]],
  ['Déficit de Capacidad',UNICEF_COLORS[5]]
])

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
  return (
    <Grid container item wrap='nowrap'>
      <Legend colors={STAT_CATEGORY_COLORS} />
      <Legend colors={CAPACITY_COLORS} />
    </Grid>
  );
}

function Legend({colors}:any) {
  const classes = useLegendStyle();
  const legend = Array.from(colors)
  return (
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
  );
}
