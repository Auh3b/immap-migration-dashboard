import IntroRightView from './introductionViews/IntroRightView';
import IntroMiddleView from './introductionViews/IntroMiddleView';
import IntroLeftView from './introductionViews/IntroLeftView';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Fab, Grid, Typography } from '@material-ui/core';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef.svg';
import { ReactComponent as ImmapLogo } from 'assets/img/immapLogoAlt.svg';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useIntroData, {
  useClearIntroFilters,
} from 'components/indicators/introduction/hooks/useIntroData';
import ClearAllIcon from '@material-ui/icons/ClearAll';

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
}));

export default function Introduction() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.introduction}
    >
      <IntroHeader />
      <IntroContent />
      <ClearFiltersButton />
    </Grid>
  );
}

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
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
    [theme.breakpoints.down('xl')]: {
      ...theme.typography.h4,
    },
    [theme.breakpoints.up('xl')]: {
      ...theme.typography.h4,
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
    <Grid
      container
      wrap='nowrap'
      justifyContent='space-between'
      item
      className={classes.root}
    >
      <Grid md={12} lg={10} item className={classes.headerText}>
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
  );
}

const useContentStyles = makeStyles((theme) => ({
  root: {
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

const useClearStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: theme.spacing(4),
    bottom: theme.spacing(8),
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

function ClearFiltersButton() {
  const classes = useClearStyles();
  const { hasFilters, clearAllIntroFilters } = useClearIntroFilters();
  return (
    <>
      {hasFilters && (
        <Fab
          onClick={clearAllIntroFilters}
          size='large'
          variant='extended'
          className={classes.root}
        >
          <Typography
            color='inherit'
            variant='overline'
            className={classes.text}
          >
            Clear All
          </Typography>
          <ClearAllIcon />
        </Fab>
      )}
    </>
  );
}
