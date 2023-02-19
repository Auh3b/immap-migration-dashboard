import { Drawer, Grid, makeStyles } from '@material-ui/core';
import { ReactChild, ReactNode } from 'react';
import MapContainer from './MapContainer';

const DRAWER_WIDTH = 350;

interface MainViewChildren {
  left?: ReactChild;
  middle?: ReactChild | ReactNode;
  right?: ReactChild;
  bottom?: ReactChild;
}

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
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
      <Grid item className={classes.drawer}>
        {children.left}
      </Grid>
      <Grid xs container direction='column'  item alignContent='stretch'>
        <MapContainer />
        <Grid item>
          {children.bottom}
        </Grid>
      </Grid>
      {children.right ?  <Grid item className={classes.drawer}>
        {children.right}
      </Grid> : <></>}
    </>
  );
}
