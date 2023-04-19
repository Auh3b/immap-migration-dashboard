import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { lazy, useState } from 'react';
import { MainViewChildren } from './utils/types';
import { Grid, makeStyles, IconButton, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const MapContainer = lazy(() => import('./MapContainer'));

const DRAWER_WIDTH = 300;
const MIDDLE_HEIGHT = 50;

const useStylesDesktop = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    maxHeight: `calc(100vh - 54px)`,
    overflow: 'auto',
    position: 'relative',
    transition: 'all 500ms ease-in-out',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    // width: DRAWER_WIDTH,
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
  rightDrawerToggle: {
    position: 'absolute',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[10],
    top: '64px',
    left: '-10px',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    zIndex: 100000,
  },
}));

export default function Desktop({ children }: { children: MainViewChildren }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const classes = useStylesDesktop();

  const handleDrawerExpand = () => {
    setExpanded((prev) => !prev);
  };

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
          style={{
            width: `${DRAWER_WIDTH}px`,
          }}
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
          style={{
            width: expanded ? '600px' : `${DRAWER_WIDTH}px`,
          }}
        >
          <IconButton
            color='inherit'
            onClick={handleDrawerExpand}
            className={classes.rightDrawerToggle}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          {children.right}
        </Grid>
      )}
    </>
  );
}
