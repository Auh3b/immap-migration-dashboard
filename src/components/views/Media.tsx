import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MediaAggregateIndicators from './mediaViews/MediaAggregateIndicators';
import MediaFilterToolbar from './mediaViews/MediaFilterToolbar';
import { useEffect, useState } from 'react';
import { setError } from 'store/appSlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { fireStorage } from 'firedb';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    maxHeight: `cal(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: 'auto',
  },
}));

export default function Media() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchMediaData = async () => {
    setIsLoading(true)
    try {
      const dataRef = ref(fireStorage, 'data/summarised_meltwater_data.json');
      const dataUrl = await getDownloadURL(dataRef);
      const dataReq = await fetch(dataUrl);
      const dataRes = await dataReq.json();
      setData(dataRes);
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    // fetchMediaData()
    return () => {
      setData([]);
    };
  }, []);

  console.log(data);
  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        spacing={2}
        direction='column'
        item
        className={classes.root}
      >
        <MediaFilterToolbar />
        <MediaAggregateIndicators data={data} isLoading={isLoading}/>
      </Grid>
    </div>
  );
}
