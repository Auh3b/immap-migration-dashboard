import IntroRightView from './introductionViews/IntroRightView';
import IntroMiddleView from './introductionViews/IntroMiddleView';
import IntroLeftView from './introductionViews/IntroLeftView';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Divider,
  Fab,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef.svg';
import { ReactComponent as ImmapLogo } from 'assets/img/immapLogoAlt.svg';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useIntroData, {
  useClearIntroFilters,
} from 'components/indicators/introduction/hooks/useIntroData';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ClearFiltersButton from 'components/common/ClearFiltersButton';

const useStyles = makeStyles((theme) => ({
  introduction: {
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100vh',
      overflowY: 'scroll',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  clearButton: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    opacity: 0.25,
    '&:hover':{
      opacity: 0.75
    }
  }
}));

export default function Introduction() {
  const classes = useStyles();
  const {hasFilters, clearAllIntroFilters} = useClearIntroFilters()
  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.introduction}
    >
      <IntroHeader />
      <IntroContent />
      <ClearFiltersButton disabled={!hasFilters} clearCallback={clearAllIntroFilters} className={classes.clearButton} />
    </Grid>
  );
}

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
  logoContainer: {},
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
    [theme.breakpoints.down('xl')]: {
      ...theme.typography.h5,
    },
    [theme.breakpoints.up('xl')]: {
      ...theme.typography.h5,
    },
  },
  subtitle: {
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
}));

function IntroHeader() {
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
            className={classes.logoContainer}
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

const useContentStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.mixins.toolbar.minHeight,
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      flexGrow: 0,
      gap: theme.spacing(2),
    },
  },
}));

function IntroContent() {
  const classes = useContentStyles();
  const { auroraData, premiseData, isLoading } = useIntroData();

  return (
    <Grid container wrap='nowrap' item className={classes.root}>
      <IntroLeftView />
      <IntroMiddleView data={[auroraData, premiseData]} isLoading={isLoading} />
      <IntroRightView data={premiseData} isLoading={isLoading} />
    </Grid>
  );
}

const useButtonStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1,
    },
  },
  button: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(4),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      opacity: 0.5,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },
  },
}));

function ExitButton() {
  const classes = useButtonStyles();
  return (
    <Grid item className={classes.root}>
      <Button
        component={NavLink}
        to={ROUTE_PATHS.PREMISE_SERVICE}
        variant='outlined'
        size='large'
        className={classes.button}
        endIcon={<ArrowForwardIcon />}
      >
        Dashboard
      </Button>
    </Grid>
  );
}