import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  services: {},
}));

export default function Services() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.services}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
