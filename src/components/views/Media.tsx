import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MediaAggregateIndicators from './mediaViews/MediaAggregateIndicators';
import MediaFilterToolbar from './mediaViews/MediaFilterToolbar';
import { useEffect, useState } from 'react';
import { setError } from 'store/appSlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { fireStorage } from 'firedb';
import MediaIndicators from './mediaViews/utils/MediaIndicators';
import MediaOrigin from 'components/indicators/media/MediaOrigin';
import TopPhrases from 'components/indicators/media/TopPhrases';
import SentimentPresentages from 'components/indicators/media/SentimentPresentages';
import SentimentTimeline from 'components/indicators/media/SentimentTimeline';
import { wrap } from 'comlink';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: 'auto',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const MediaWorker = new Worker('./mediaViews/utils/mediaWorker', {
  name: 'MediaWorker',
  type: 'module',
});

export default function Media() {
  //@ts-ignore
  const { setMediaData, getMediaData, runTransform } = wrap(MediaWorker);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMediaData = async () => {
    setIsLoading(true);
    try {
      const dataRef = ref(
        fireStorage,
        'data/summarised_meltwater_data_v2.json',
      );
      const dataUrl = await getDownloadURL(dataRef);
      const dataReq = await fetch(dataUrl);
      const dataRes = await dataReq.json();
      // setData(dataRes);
      await setMediaData(dataRes);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaData();
    return () => {
      setData([]);
    };
  }, []);

  useEffect(() => {
    (async function () {
      if (!isLoading) {
        setData(await getMediaData());
      }
    })();
  }, [isLoading]);
  console.log(data);
  return (
    <Grid
      container
      direction='column'
      item
      wrap='nowrap'
      className={classes.root}
    >
      <MediaFilterToolbar />
      <MediaAggregateIndicators
        data={data}
        isLoading={isLoading}
        transform={runTransform}
      />
      <MediaIndicators isLoading={isLoading}>
        <Grid item xs={12} container>
          <MediaOrigin
            data={data}
            isLoading={isLoading}
            transform={runTransform}
          />
          <SentimentPresentages
            data={data}
            isLoading={isLoading}
            transform={runTransform}
          />
          <SentimentTimeline
            data={data}
            isLoading={isLoading}
            transform={runTransform}
          />
        </Grid>
        <Grid item xs={12} container>
          <TopPhrases data={data} isLoading={isLoading} transform={runTransform}  />
        </Grid>
      </MediaIndicators>
    </Grid>
  );
}
