import { Grid, Typography, makeStyles } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { UNICEF_COLORS } from 'theme';
export const useLeftStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    BorderRight: `1px solid ${UNICEF_COLORS[0]}`,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  subtitle: { ...theme.typography.caption, marginBottom: theme.spacing(2) },
  description: {
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.body1,
      fontSize: '0.75rem',
    },
  },
}));
export default function IntroLeftView() {
  const classes = useLeftStyles();
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      item
      lg={3}
      md={12}
      className={classes.root}
    >
      <Grid item>
        <Typography variant='subtitle1'>Nota metodológica</Typography>
        <Typography className={classes.subtitle}>A Aurora Chatbot</Typography>
        <Typography className={classes.description}>
          El propósito de este reporte es apoyar el seguimiento a la recolección
          de la información. En este sentido, toda la información contenida es
          preliminar y esta en proceso de revisión.
        </Typography>
      </Grid>
      <Grid item container spacing={2} alignItems='center'>
        <Grid item>
          <CalendarTodayIcon />
        </Grid>
        <Grid item>
          <Typography variant='overline'>
            06 de marzo al 03 de abril.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
