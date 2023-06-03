import IntroRightView from './introductionViews/IntroRightView';
import IntroMiddleView from './introductionViews/IntroMiddleView';
import IntroLeftView from './introductionViews/IntroLeftView';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearFiltersButton from 'components/common/ClearFiltersButton';
import IntroHeader from './introductionViews/IntroHeader';
import { useCallback, useEffect, useMemo, useState } from 'react';
//@ts-ignore
import { fetchLayerData, FORMATS } from '@deck.gl/carto';
import premiseSource from 'data/sources/premiseSource';
import mainSource from 'data/sources/mainSource';
import executeIntroMethod from 'components/indicators/introduction/utils/executeIntroMethod';
import { useDispatch, useSelector } from 'react-redux';
import { setIsIntroDataReady } from 'store/introSlice';
import { setError } from 'store/appSlice';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import ComponentFallback from 'components/common/ComponentFallback';
import { clearIntroFilters } from 'store/introSlice';

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
    '&:hover': {
      opacity: 0.75,
    },
  },
}));

const fetchPremise = async () => {
  const { data: result } = await fetchLayerData({
    source: premiseSource.data,
    type: premiseSource.type,
    connection: premiseSource.connection,
    format: FORMATS.JSON,
  });
  return result;
};
const fetchAurora = async () => {
  const { data: result } = await fetchLayerData({
    source: mainSource.data,
    type: mainSource.type,
    connection: mainSource.connection,
    format: FORMATS.JSON,
  });
  return result;
};

export default function Introduction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    Promise.all([fetchAurora(), fetchPremise()])
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
    fetchData();
    return () => {
      setIsLoading(false);
    };
  }, []);

  //@ts-ignore
  const filters = useSelector((state) => state.intro.filters) || {};

  const hasFilters = useMemo(() => Object.keys(filters).length || 0, [filters]);
  const clearCallback = useCallback(() => {
    dispatch(clearIntroFilters());
  }, [hasFilters]);

  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.introduction}
    >
      <IntroHeader />
      <IntroContent isLoading={isLoading} />
      <ClearFiltersButton
        disabled={!hasFilters}
        clearCallback={clearCallback}
        className={classes.clearButton}
      />
    </Grid>
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

function IntroContent({ isLoading }: { isLoading: Boolean }) {
  const classes = useContentStyles();
  return (
    <Grid container wrap='nowrap' item className={classes.root}>
      {isLoading && <ComponentFallback />}
      {!isLoading && (
        <>
          <IntroLeftView />
          <IntroMiddleView />
          <IntroRightView />
        </>
      )}
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

export function ExitButton() {
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
