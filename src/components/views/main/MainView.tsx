import { Grid, makeStyles } from '@material-ui/core';
import { ReactChild, ReactNode } from 'react';
// import { useOutletContext } from 'react-router-dom';
import MapContainer from './MapContainer';

const DRAWER_WIDTH = 250;

interface MainViewChildren {
  left?: ReactChild;
  middle?: ReactChild | ReactNode;
  right?: ReactChild;
  bottom?: ReactChild;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflow: 'auto',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

export default function MainView({ children }: { children: MainViewChildren }) {
  const classes = useStyles();
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
