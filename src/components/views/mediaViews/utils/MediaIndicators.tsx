import { Grid, Paper, makeStyles } from '@material-ui/core';
import ComponentFallback from 'components/common/ComponentFallback';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
  },
}));
export default function MediaIndicators({ isLoading, children }: any) {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.content}>
          {isLoading ? <ComponentFallback /> : children}
        </Grid>
      </Paper>
    </Grid>
  );
}
