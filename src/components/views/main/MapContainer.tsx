import { ReactNode, lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid, useMediaQuery } from '@material-ui/core';
import { CustomTheme } from 'theme';
import { LegendWidget } from '@carto/react-widgets';
import InformationSection from 'components/common/InformationSection';

const Map = lazy(
  () => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'),
);

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    },

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
      bottom: theme.spacing(14),
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

export default function MapContainer({ children }: { children?: ReactNode }) {
  const isGmaps = useSelector(
    // @ts-ignore
    (state) => BASEMAPS[state.carto.basemap].type === 'gmaps',
  );
  const classes = useStyles();
  const layers = getLayers();

  const hidden = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('xs'),
  );

  return (
    <Grid
      item
      className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}
    >
      <Map layers={layers} />
      {hidden ? null : (
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
      )}
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
      <InformationSection />
      {/* <QuickStats /> */}
      {children && children}
      <LegendWidget initialCollapsed={true} className={classes.legend} />
    </Grid>
  );
}
