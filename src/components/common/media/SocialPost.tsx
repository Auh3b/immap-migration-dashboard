import { Grid, makeStyles } from '@material-ui/core';
import { MEDIA_SOURCES } from 'components/views/mediaViews/utils/mediaUtils';
import YoutubePost from './YoutubePost';
import TwitterPost from './TwitterPost';
import TiktokPost from './TiktokPost';

const usePostStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SocialPost({
  url,
  source,
}: {
  url: string;
  source: string;
}) {
  const classes = usePostStyles();
  const setPost = (source:string, url:string) =>{
    switch (source) {
      case MEDIA_SOURCES.YOUTUBE:{
        return <YoutubePost url={url}/>
      }
      case MEDIA_SOURCES.TWITTER:{
        return <TwitterPost url={url} />
      }
      case MEDIA_SOURCES.TIKTOK:{
        return <TiktokPost url={url} />
      }
    }
  }

  return (
    <Grid item className={classes.root}>
      {setPost(source, url)}
    </Grid>
  );
}
