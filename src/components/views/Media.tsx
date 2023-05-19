import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MediaAggregateIndicators from './mediaViews/MediaAggregateIndicators';
import MediaFilterToolbar from './mediaViews/MediaFilterToolbar';
import { useEffect, useState } from 'react';
import { setError } from 'store/appSlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { fireStorage } from 'firedb';
import MediaIndicators from './mediaViews/MediaIndicators';
import MediaOrigin from 'components/indicators/media/MediaOrigin';
import TopPhrases from 'components/indicators/media/TopPhrases';
import SentimentPresentages from 'components/indicators/media/SentimentPresentages';
import SentimentTimeline from 'components/indicators/media/SentimentTimeline';
import { wrap } from 'comlink';
import { useSelector } from 'react-redux';
import MediaEngagement from 'components/indicators/media/MediaEngagement';

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
  const { setMediaData, getMediaData, runTransform, setFilters } =
    wrap(MediaWorker);
  const classes = useStyles();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters);
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
    setFilters(filters);
  }, [filters]);

  useEffect(() => {
    (async function () {
      if (!isLoading) {
        setData(await getMediaData());
      }
    })();
  }, [isLoading]);

  return (
    <Grid
      container
      direction='column'
      item
      wrap='nowrap'
      className={classes.root}
    >
      <MediaFilterToolbar filters={filters} />
      <MediaAggregateIndicators
        deps={[data, filters]}
        isLoading={isLoading}
        transform={runTransform}
      />
      <MediaIndicators isLoading={isLoading}>
        <MediaOrigin
          deps={[data, filters]}
          isLoading={isLoading}
          transform={runTransform}
        />
        <SentimentPresentages
          deps={[data, filters]}
          isLoading={isLoading}
          transform={runTransform}
        />
        <TopPhrases
          deps={[data, filters]}
          isLoading={isLoading}
          transform={runTransform}
        />
        <SentimentTimeline
          deps={[data, filters]}
          isLoading={isLoading}
          transform={runTransform}
        />
        <MediaEngagement
          deps={[data, filters]}
          isLoading={isLoading}
          transform={runTransform}
        />
      </MediaIndicators>
    </Grid>
  );
}
