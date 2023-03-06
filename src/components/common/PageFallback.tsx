import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
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
      <Grid container item xs={12} className={classes.section} justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
