import { Grid, Paper, makeStyles } from '@material-ui/core';
import ComponentFallback from 'components/common/ComponentFallback';
import MediaOrigin from 'components/indicators/media/MediaOrigin';
import TopPhrases from 'components/indicators/media/TopPhrases';
import SentimentPresentages from 'components/indicators/media/SentimentPresentages';
import SentimentTimeline from 'components/indicators/media/SentimentTimeline';
import MediaEngagement from 'components/indicators/media/MediaEngagement';

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
          {isLoading && <ComponentFallback />}
          {!isLoading && (
            <>
              <MediaOrigin />
              <SentimentPresentages />
              {/* <TopPhrases /> */}
              <SentimentTimeline />
              <MediaEngagement />
            </>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}
