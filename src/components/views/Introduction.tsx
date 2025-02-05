import IntroRightView from './introductionViews/IntroRightView';
import IntroMiddleView from './introductionViews/IntroMiddleView';
import IntroLeftView from './introductionViews/introLeftView/Index';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IntroHeader from './introductionViews/IntroHeader';
import { useEffect, useState } from 'react';
//@ts-ignore
import { fetchLayerData, FORMATS } from '@deck.gl/carto';
import useIntroPremiseSource from 'data/sources/introPremiseSource';
import useIntroAuroraSource from 'data/sources/introAuroraSource';
import executeIntroMethod from 'components/indicators/introduction/utils/executeIntroMethod';
import { useDispatch, useSelector } from 'react-redux';
import { setIsIntroDataReady } from 'store/introSlice';
import { setError } from 'store/appSlice';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { CustomTheme } from 'theme';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  introduction: {
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100vh',
      overflowY: 'scroll',
    },
  },
  clearButton: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    opacity: 0.25,
    '&:hover': {
      opacity: 0.75,
    },
  },
}));

const fetchPremise = async (introPremiseSource) => {
  const { data: result } = await fetchLayerData({
    source: introPremiseSource.data,
    type: introPremiseSource.type,
    connection: introPremiseSource.connection,
    format: FORMATS.JSON,
    headers: {
      'cache-control': 'max-age=300',
    },
  });
  return result;
};
const fetchAurora = async (introAuroraSource) => {
  const { data: result } = await fetchLayerData({
    source: introAuroraSource.data,
    type: introAuroraSource.type,
    connection: introAuroraSource.connection,
    format: FORMATS.JSON,
    headers: {
      'cache-control': 'max-age=300',
    },
  });
  return result;
};

export default function Introduction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const introPremiseSource = useIntroPremiseSource();
  const introAuroraSource = useIntroAuroraSource();

  const fetchData = async (phase) => {
    setIsLoading(true);
    dispatch(setIsIntroDataReady(false));
    Promise.all([
      fetchAurora(introAuroraSource(phase ?? 1)),
      fetchPremise(introPremiseSource(phase ?? 1)),
    ])
      .then(([aurora, premise]) => {
        return executeIntroMethod({
          methodName: EXTERNAL_METHOD_NAMES.SET_DATA,
          params: {
            data: {
              aurora,
              premise,
            },
          },
        });
      })
      .then((result) => dispatch(setIsIntroDataReady(result)))
      .catch((e) => dispatch(setError(e.message)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData(phase);
    return () => {
      setIsLoading(false);
    };
  }, [phase]);

  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.introduction}
    >
      <IntroHeader />
      <IntroContent />
    </Grid>
  );
}

const useContentStyles = makeStyles((theme) => ({
  root: {
    marginTop: ({ isMobile }: any) =>
      isMobile
        ? (theme.mixins.toolbar.minHeight as number) * 2
        : theme.mixins.toolbar.minHeight,
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      flexGrow: 0,
      gap: theme.spacing(2),
    },
  },
}));

function IntroContent() {
  const isMobile = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('sm'),
  );
  const classes = useContentStyles({ isMobile });
  return (
    <Grid container wrap='nowrap' item className={classes.root}>
      <IntroLeftView />
      <IntroMiddleView />
      <IntroRightView />
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
  mobile: {
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
  desktop: {
    padding: '0px 16px',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.secondary.dark,
    },
  },
}));

export function ExitButton() {
  const classes = useButtonStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid item className={classes.root}>
      <Button
        component={NavLink}
        to={ROUTE_PATHS.PREMISE_SERVICE}
        variant={isMobile ? 'outlined' : 'text'}
        size='large'
        className={clsx({
          [classes.mobile]: isMobile,
          [classes.desktop]: !isMobile,
        })}
        endIcon={<ArrowForwardIcon />}
      >
        Board
      </Button>
    </Grid>
  );
}
