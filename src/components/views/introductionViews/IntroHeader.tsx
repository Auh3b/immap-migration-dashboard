import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ExitButton } from '../Introduction';
import AppLogos from 'components/common/header/AppLogos';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import UserMenu from 'components/common/header/UserMenu';

const useHeaderStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: '1px solid rgba(44, 48, 50, 0.12)',
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
    marginLeft: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderLeft: '1px solid rgba(44, 48, 50, 0.12)',
    flexGrow: 2,
  },
  titleLogo: {
    '& h1': {
      display: 'flex',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.primary,

      '& strong': {
        marginRight: theme.spacing(0.5),
      },

      '& svg': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(1.5),
        width: 'auto',
        verticalAlign: 'bottom',
        color: 'black',
      },
    },
  },
  title: {
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.h6,
    },
    [theme.breakpoints.up('sm')]: {
      ...theme.typography.h5,
      fontSize: '1.5em',
    },
  },
  subtitle: {
    lineHeight: 'unset',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
    [theme.breakpoints.down('md')]: {
      ...theme.typography.subtitle2,
      fontWeight: 'normal',
    },
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
}));

export default function IntroHeader() {
  const classes = useHeaderStyles();
  return (
    <AppBar elevation={0} className={classes.bar}>
      <Toolbar variant='dense'>
        <Link
          component={NavLink}
          to={ROUTE_PATHS.DEFAULT}
          className={classes.titleLogo}
        >
          <Typography component='h1' variant='subtitle1' noWrap>
            <AppLogos />
          </Typography>
        </Link>
        <Grid item className={classes.headerText}>
          <Typography className={classes.title} color='primary'>
            Monitoreo a la Respuesta y Flujos Migratorios Mixtos
          </Typography>
          <Typography className={classes.subtitle}>
            Recolección de datos: 6 de marzo a 04 de abril – Necoclí, Panamá y
            Costa Rica
          </Typography>
        </Grid>
        <ExitButton />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
