import { 
  Grid, 
  makeStyles, 
  SwipeableDrawer, 
  useMediaQuery, 
  Drawer, 
  Fab 
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { lazy, ReactChild, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBottomSheetOpen } from 'store/appSlice';
import { RootState } from 'store/store';
import { useTheme } from '@material-ui/styles';
import { CustomTheme } from 'theme';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import PageFallback from 'components/common/PageFallback'

const MapContainer = lazy(() => import('./MapContainer'));

const DRAWER_WIDTH = 300;

interface MainViewChildren {
  left?: ReactChild;
  middle?: ReactChild | ReactNode;
  right?: ReactChild;
  bottom?: ReactChild;
}

export default function MainView({ children }: { children: MainViewChildren }) {
  const { breakpoints }: CustomTheme = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));

  return (
    <>
      <LazyLoadRoute fallback={<PageFallback />}>
        {!isMobile && <Desktop children={children} />}
        {isMobile && <Mobile children={children}/>}
      </LazyLoadRoute>
    </>
  );
}

const useStylesDesktop = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
    maxHeight: `calc(100vh - 54px)`,
    overflow: 'auto',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

function Desktop({children}:{children: MainViewChildren}) {
  const classes = useStylesDesktop();

  return (
    <>
      <Grid
        container
        wrap='nowrap'
        direction='column'
        item
        className={classes.drawer}
      >
        {children.left}
      </Grid>
      <Grid xs container direction='column' item alignContent='stretch'>
        <MapContainer />
        <Grid item>{children.bottom}</Grid>
      </Grid>
      {children.right ? (
        <Grid
          container
          wrap='nowrap'
          direction='column'
          item
          className={classes.drawer}
        >
          {children.right}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

const useStyleMobile = makeStyles((theme) => ({
  closed: {},
  bottomSheet: {
    maxHeight: `calc(100% - ${theme.spacing(6)}px)`,

    '&$closed': {
      transform: `translateY(calc(100% - ${theme.spacing(12)}px)) !important`,
      visibility: 'visible !important',

      '& $bottomSheetContent': {
        overflow: 'hidden',
      },
    },
  },
  bottomSheetContent: {
    minHeight: theme.spacing(18),
    '& > *': {
      paddingBottom: theme.spacing(6),
    },
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    transform: `translateY(${theme.spacing(3)}px)`,
    transition: `transform ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms`,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    '& .MuiFab-label': {
      width: theme.spacing(9),
      justifyContent: 'flex-start',
    },

    '&$buttonShow': {
      transform: 'translateY(0)',

      '& $bottomSheetIcon': {
        transform: 'rotate(0)',
      },
    },
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
  },
  buttonShow: {},
}));

function Mobile({children}:{children: MainViewChildren}) {
  const dispatch = useDispatch();
  const bottomSheetOpen = useSelector(
    (state: RootState) => state.app.bottomSheetOpen,
  );
  const classes = useStyleMobile();

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <>
      <MapContainer />
      {/* @ts-ignore */}
      <SwipeableDrawer
        variant='persistent'
        anchor='bottom'
        open={bottomSheetOpen}
        onOpen={handleWidgetsDrawerToggle}
        onClose={handleWidgetsDrawerToggle}
        PaperProps={{
          className: `${classes.bottomSheet} ${
            !bottomSheetOpen ? classes.closed : ''
          }`,
          elevation: 8,
        }}
      >
        <div className={classes.bottomSheetContent}>
          {children?.left}
          {children?.right}
          {children?.bottom}
        </div>
      </SwipeableDrawer>
      <Fab
        variant='extended'
        size='small'
        color='inherit'
        aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
        className={`${classes.bottomSheetButton} ${
          !bottomSheetOpen ? classes.buttonShow : ''
        }`}
        onClick={handleWidgetsDrawerToggle}
      >
        <ExpandLessIcon className={classes.bottomSheetIcon} />
        {bottomSheetOpen ? 'Hide' : 'Show'}
      </Fab>
    </>
  );
}
