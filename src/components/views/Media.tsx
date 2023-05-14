import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MainView from './main/MainView';

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
}));

export default function Media() {
  const classes = useStyles();

  



  return (
    <Grid item className={classes.mapWrapper}>
      
    </Grid>
  );
}
