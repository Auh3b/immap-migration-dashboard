import { Grid, Paper, makeStyles } from '@material-ui/core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import { METHOD_NAMES } from './utils/methodName';
import TopLoading from 'components/common/TopLoading';
import ComponentFallback from 'components/common/ComponentFallback';
import SocialPost from 'components/common/media/SocialPost';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  paper: {},
  content: {
    padding: theme.spacing(2),
  },
}));

const id = 'media_posts';

export default function MediaPosts({ isLoading }: { isLoading: Boolean }) {
  const classes = useStyles();
  const { data, isLoading: isDataLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_POSTS,
  });
  console.log(data);
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        {isDataLoading && <TopLoading />}
        <Grid container spacing={4} className={classes.content}>
          {isLoading && <ComponentFallback />}
          {data.length > 0 &&
            data.map(({ name, url, source }) => <SocialPost source={source} key={name} url={url} />)}
        </Grid>
      </Paper>
    </Grid>
  );
}
