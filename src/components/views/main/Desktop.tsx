import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Suspense, lazy, useState } from 'react';
import { MainViewChildren } from './utils/types';
import { Grid, makeStyles, IconButton, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SideAnalyticsPanel from 'components/common/sideAnalysticsPanel/Index';
import ComponentFallback from 'components/common/ComponentFallback';

const MapContainer = lazy(() => import('./MapContainer'));

const DRAWER_WIDTH_CLOSED = 350;
const DRAWER_WIDTH_OPEN = 600;

const MIDDLE_HEIGHT = 50;

const useStylesDesktop = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
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

export default function Desktop({ children }: { children: MainViewChildren }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStylesDesktop();
  const handleToggleDrawer = () => {
    setIsOpen((existingValue) => !existingValue);
  };

  return (
    <>
      <SideAnalyticsPanel>{children?.side}</SideAnalyticsPanel>
      <SideView direction={'left'} expandable={children?.left?.expandable}>
        {children?.left?.element}
      </SideView>
      <Grid xs container direction='column' item alignContent='stretch'>
        <Suspense fallback={<ComponentFallback />}>
          <MapContainer />
        </Suspense>
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
              {children.middle.element}
            </Collapse>
          </Grid>
        )}
      </Grid>
      <SideView direction={'right'} expandable={children?.right?.expandable}>
        {children?.right?.element}
      </SideView>
    </>
  );
}

const useSideStyles = makeStyles((theme) => ({
  root: {
    width: ({ isOpen }: any) =>
      isOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
    maxHeight: `calc(100vh - 54px)`,
    overflow: 'auto',
    transition: 'width 250ms ease-in-out',
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    position: 'absolute',
    alignSelf: ({ direction }: any) =>
      direction === 'left' ? 'flex-end' : 'flex-start',
    transform: ({ direction }: any) =>
      direction === 'left' ? 'translate(20px, 5px)' : 'translate(-25px, 5px)',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[10],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

function SideView({ direction, expandable, children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useSideStyles({ isOpen, direction });
  const handleExpand = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {children && (
        <Grid
          direction='column'
          wrap='nowrap'
          item
          container
          className={classes.root}
        >
          {expandable && (
            <IconButton
              color='inherit'
              onClick={handleExpand}
              className={classes.button}
            >
              <ExpandIcon isOpen={isOpen} direction={direction} />
            </IconButton>
          )}
          {children}
        </Grid>
      )}
    </>
  );
}

const iconDirection = (direction: 'left' | 'right') => {
  switch (direction) {
    case 'right':
      return 'rotate(0deg)';
    case 'left': {
      return 'rotate(180deg)';
    }
    default:
      return 'rotate(0deg)';
  }
};

const useIconStyle = makeStyles((theme) => ({
  root: {
    transform: ({ direction }: any) => iconDirection(direction),
  },
}));

function ExpandIcon({ direction, isOpen }: any) {
  const classes = useIconStyle({ direction });
  return (
    <>
      {isOpen ? (
        <ChevronRightIcon className={classes.root} />
      ) : (
        <ChevronLeftIcon className={classes.root} />
      )}
    </>
  );
}
