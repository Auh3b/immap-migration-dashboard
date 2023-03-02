import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
//@ts-ignore
import { fetchMap } from '@deck.gl/carto';
//@ts-ignore
import { useEffect, useState } from 'react';
import DeckGLComponent from 'components/common/map/DeckGLComponent';
import TopLoading from 'components/common/TopLoading';
import { useDispatch } from 'react-redux';
import { setViewState } from '@carto/react-redux';

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    // },

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
}));

const cartoMapId = '9ddf6a22-3bdf-4b41-9d6a-80ea80895d32';

export default function Media() {
  const classes = useStyles();
  const [layers, setLayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMapLayers() {
      setIsLoading(true);
      const { initialViewState, layers } = await fetchMap({
        cartoMapId,
      });
      // dispatch(setBasemap(mapStyle.styleType))
      dispatch(setViewState(initialViewState));
      setLayers(layers);
      setIsLoading(false);
    }

    fetchMapLayers();

    return () => {
      setLayers([]);
    };
  }, []);

  // [hygen] Add useEffect

  return (
    <Grid item className={classes.mapWrapper}>
      {isLoading ? <TopLoading /> : ''}
      <DeckGLComponent layers={layers} />
    </Grid>
  );
}
