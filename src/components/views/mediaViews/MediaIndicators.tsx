import { Grid, Paper, makeStyles } from '@material-ui/core';
import ComponentFallback from 'components/common/ComponentFallback';
const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {},
  content: {
    padding: theme.spacing(2),
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
