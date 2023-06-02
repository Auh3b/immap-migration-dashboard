import { Grid, Paper, makeStyles } from '@material-ui/core';
import ComponentFallback from 'components/common/ComponentFallback';
import { Suspense, lazy } from 'react';

const MediaOrigin = lazy(
  () => import('components/indicators/media/MediaOrigin'),
);
const TopPhrases = lazy(() => import('components/indicators/media/TopPhrases'));
const SentimentPresentages = lazy(
  () => import('components/indicators/media/SentimentPresentages'),
);
const SentimentTimeline = lazy(
  () => import('components/indicators/media/SentimentTimeline'),
);
const MediaEngagement = lazy(
  () => import('components/indicators/media/MediaEngagement'),
);

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {},
  content: {
    padding: theme.spacing(2),
  },
}));
export default function MediaIndicators({ isLoading }: any) {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.content}>
          <Suspense fallback={<ComponentFallback />}>
            <MediaOrigin />
          </Suspense>
          <Suspense fallback={<ComponentFallback />}>
            <SentimentPresentages />
          </Suspense>
          <Suspense fallback={<ComponentFallback />}>
            <TopPhrases />
          </Suspense>
          <Suspense fallback={<ComponentFallback />}>
            <SentimentTimeline />
          </Suspense>
          <Suspense fallback={<ComponentFallback />}>
            <MediaEngagement />
          </Suspense>
        </Grid>
      </Paper>
    </Grid>
  );
}
