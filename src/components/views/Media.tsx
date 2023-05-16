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

export default function Media() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMediaData = async () => {
    setIsLoading(true);
    try {
      const dataRef = ref(fireStorage, 'data/summarised_meltwater_data.json');
      const dataUrl = await getDownloadURL(dataRef);
      const dataReq = await fetch(dataUrl);
      const dataRes = await dataReq.json();
      setData(dataRes);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchMediaData();
    return () => {
      setData([]);
    };
  }, []);

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
      <MediaAggregateIndicators data={data} isLoading={isLoading} />
      <MediaIndicators isLoading={isLoading}>
        <MediaOrigin data={data} isLoading={isLoading} />
        <TopPhrases data={data} isLoading={isLoading} />
        <SentimentPresentages data={data} isLoading={isLoading} />
      </MediaIndicators>
    </Grid>
  );
}
