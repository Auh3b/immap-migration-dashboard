import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  media: {},
}));

export default function Media() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.media}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
