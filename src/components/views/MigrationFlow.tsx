import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  migrationFlow: {},
}));

export default function MigrationFlow() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.migrationFlow}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
