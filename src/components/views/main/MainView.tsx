import {
  Grid,
  makeStyles,
  SwipeableDrawer,
  useMediaQuery,
  Fab,
  IconButton,
  Collapse,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { lazy, ReactChild, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBottomSheetOpen } from 'store/appSlice';
import { RootState } from 'store/store';
import { useTheme } from '@material-ui/styles';
import { CustomTheme } from 'theme';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import PageFallback from 'components/common/PageFallback';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MapContainer = lazy(() => import('./MapContainer'));

const DRAWER_WIDTH = 300;
const MIDDLE_HEIGHT = 50;

interface MainViewChildren {
  left?: ReactChild;
  middle?: ReactChild | ReactNode;
  right?: ReactChild;
  bottom?: ReactChild;
}

export default function MainView({ children }: { children: MainViewChildren }) {
  const { breakpoints }: CustomTheme = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [view, setView] = useState<null | ReactNode>(null);

  useEffect(() => {
    if (isMobile) {
      setView(<Mobile children={children} />);
    } else {
      setView(<Desktop children={children} />);
    }

    return () => {
      setView(null);
    };
  }, [breakpoints, isMobile]);

  return (
    <>
      <LazyLoadRoute fallback={<PageFallback />}>
        {view}
        {/* {!isMobile && <Desktop children={children} />}
        {isMobile && <Mobile children={children}/>} */}
      </LazyLoadRoute>
    </>
  );
}

const useStylesDesktop = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    maxHeight: `calc(100vh - 54px)`,
    overflow: 'auto',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
  middleDrawer: {
    minHeight: MIDDLE_HEIGHT,
    position: 'relative',
  },
  middleDrawerToggle: {
    position: 'relative',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[10],
    top: '-10px',
    left: '10px',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

function Desktop({ children }: { children: MainViewChildren }) {
  const [isOpen, setIsOpen] = useState(true);
  const classes = useStylesDesktop();
  const handleToggleDrawer = () => {
    setIsOpen((existingValue) => !existingValue);
  };
  return (
    <>
      {children.left && (
        <Grid
          container
          wrap='nowrap'
          direction='column'
          item
          className={classes.drawer}
        >
          {children.left}
        </Grid>
      )}
      <Grid xs container direction='column' item alignContent='stretch'>
        <MapContainer />
        {children.middle && (
          <Grid className={classes.middleDrawer} item>
            <IconButton
              color='inherit'
              onClick={handleToggleDrawer}
              className={classes.middleDrawerToggle}
            >
              {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <Collapse in={isOpen} unmountOnExit>
              {children.middle}
            </Collapse>
          </Grid>
        )}
      </Grid>
      {children.right && (
        <Grid
          container
          wrap='nowrap'
          direction='column'
          item
          className={classes.drawer}
        >
          {children.right}
        </Grid>
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

function Mobile({ children }: { children: MainViewChildren }) {
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
