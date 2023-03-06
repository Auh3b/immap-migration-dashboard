import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useFallbackStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  section: {
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    flex: '2 1 auto',
    padding: theme.spacing(1),
  },
  loading: {
    display: 'block',
    height: '100%',
    width: '100%',
    transform: 'scale(1) !important',
  },
}));

export default function SkeletonTypography() {
  const classes = useFallbackStyles();
  return (
    <Grid container className={classes.main}>
      <Grid item xs={3} className={classes.section}>
        <Skeleton className={classes.loading}></Skeleton>
      </Grid>
      <Grid
        container
        direction='column'
        wrap='nowrap'
        item
        xs={6}
        className={`${classes.section}`}
      >
        <Grid item className={classes.section}>
          <Skeleton className={classes.loading}></Skeleton>
        </Grid>
        <Grid item className={classes.section}>
          <Skeleton className={classes.loading}></Skeleton>
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.section}>
        <Skeleton className={classes.loading}></Skeleton>
      </Grid>
    </Grid>
  );
}
