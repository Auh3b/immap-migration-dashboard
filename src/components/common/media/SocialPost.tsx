import { Grid, Typography, makeStyles } from '@material-ui/core';
import { MEDIA_SOURCES } from 'components/views/mediaViews/utils/mediaUtils';
import YoutubePost from './YoutubePost';
import TwitterPost from './TwitterPost';
import TiktokPost from './TiktokPost';

const usePostStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(2),
    ...theme.typography.subtitle1,
    fontSize: theme.spacing(2.2),
    fontWeight: 'bold',
  },
}));

export default function SocialPost({
  url,
  source,
}: {
  url: string;
  source: string;
}) {
  const classes = usePostStyles();
  const setPost = (source: string, url: string) => {
    switch (source) {
      case MEDIA_SOURCES.YOUTUBE: {
        return <YoutubePost url={url} />;
      }
      case MEDIA_SOURCES.TWITTER: {
        return <TwitterPost url={url} />;
      }
      case MEDIA_SOURCES.TIKTOK: {
        return <TiktokPost url={url} />;
      }
    }
  };

  return (
    <Grid item className={classes.root}>
      <Typography variant='subtitle1' className={classes.title}>
        {'TOP ' + source.toUpperCase() + ' POST'}
      </Typography>
      {setPost(source, url)}
    </Grid>
  );
}
