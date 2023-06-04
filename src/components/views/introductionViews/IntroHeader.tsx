import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Divider, Grid, Toolbar, Typography } from '@material-ui/core';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef.svg';
import { ReactComponent as ImmapLogo } from 'assets/img/immapLogoAlt.svg';
import { ExitButton } from '../Introduction';

const useHeaderStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 1,
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(2),
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(4),
    },
  },
  headerText: {
    flexGrow: 2,
  },
  title: {
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.h6,
    },
    [theme.breakpoints.up('sm')]: {
      ...theme.typography.h5,
    },
  },
  subtitle: {
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
    [theme.breakpoints.down('md')]: {
      ...theme.typography.subtitle2,
      fontWeight: 'normal',
    },
  },
}));
export default function IntroHeader() {
  const classes = useHeaderStyles();
  return (
    <AppBar elevation={0} className={classes.bar}>
      <Toolbar>
        <Grid
          container
          wrap='nowrap'
          justifyContent='space-between'
          item
          className={classes.root}
        >
          <Grid md={12} lg={8} item className={classes.headerText}>
            <Typography className={classes.title} color='primary'>
              Monitoreo a la Respuesta y Flujos Migratorios Mixtos
            </Typography>
            <Typography className={classes.subtitle}>
              Recolección de datos: 6 de marzo a 04 de abril – Necoclí, Panamá y
              Costa Rica
            </Typography>
          </Grid>
          <Grid
            wrap='nowrap'
            lg={2}
            item
            container
            alignItems='center'
            justifyContent='flex-end'
          >
            <Grid item>
              <UnicefLogo className={classes.logo} />
            </Grid>
            <Grid item>
              <ImmapLogo className={classes.logo} />
            </Grid>
            <ExitButton />
          </Grid>
        </Grid>
      </Toolbar>
      <Divider orientation='horizontal' />
    </AppBar>
  );
}
