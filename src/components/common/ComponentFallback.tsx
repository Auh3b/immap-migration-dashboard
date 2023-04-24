import { CircularProgress, Grid, makeStyles } from '@material-ui/core';

const useFallbackStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  progress:{
    
  }
}));

export default function ComponentFallback() {
  const classes = useFallbackStyles();
  return (
    <Grid container justifyContent='center' alignItems='center' className={classes.root}>
      <CircularProgress color='inherit' />
    </Grid>
  );
}
