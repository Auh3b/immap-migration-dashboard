import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MediaFilterToolbar from './mediaViews/MediaFilterToolbar';
import { Suspense, lazy, useEffect, useState } from 'react';
import { setError } from 'store/appSlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { fireStorage } from 'firedb';
import { useDispatch } from 'react-redux';
import executeMethod from 'components/indicators/media/hooks/executeMethod';
import { METHOD_NAMES } from './mediaViews/utils/methodName';
import { setIsMediaDataReady } from 'store/mediaSlice';
import ComponentFallback from 'components/common/ComponentFallback';
import SideAnalyticsPanel from 'components/common/sideAnalysticsPanel/Index';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';

const MediaIndicators = lazy(() => import('./mediaViews/MediaIndicators'));
const MediaAggregateIndicators = lazy(
  () => import('./mediaViews/MediaAggregateIndicators'),
);
const MediaPosts = lazy(() => import('./mediaViews/MediaPosts'));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: 'auto',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Media() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMediaData = async () => {
    setIsLoading(true);
    try {
      const dataRef = ref(
        fireStorage,
        'data/summarised_meltwater_data_v6.json',
      );
      const dataUrl = await getDownloadURL(dataRef);
      const dataReq = await fetch(dataUrl);
      const data = await dataReq.json();
      const result = await executeMethod(METHOD_NAMES.SET_MEDIA_DATA, { data });
      if (!result) {
        throw 'Something went wrong when loading data';
      }
      dispatch(setIsMediaDataReady({ loadingState: result }));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaData();
  }, []);

  return (
    <>
      <SideAnalyticsPanel>
        {[
          {
            content: <span>Methodology</span>,
            value: 1,
            title: 'Metodología',
            icon: <HelpOutlineIcon />,
          },
          {
            content: (
              <ActiveFilters filterSources={[{ stateSlice: 'media' }]} />
            ),
            value: 2,
            title: 'Filtros Activos',
            icon: <FilterListIcon />,
          },
          {
            content: <span>No addition filtros</span>,
            value: 3,
            title: 'Filtros Adicionales',
            icon: <TuneIcon />,
          },
        ]}
      </SideAnalyticsPanel>
      <Grid
        container
        direction='column'
        item
        wrap='nowrap'
        className={classes.root}
      >
        <MediaFilterToolbar />
        <Suspense fallback={<ComponentFallback />}>
          <MediaAggregateIndicators isLoading={isLoading} />
        </Suspense>
        <Suspense fallback={<ComponentFallback />}>
          <MediaIndicators isLoading={isLoading} />
        </Suspense>
        <Suspense fallback={<ComponentFallback />}>
          <MediaPosts isLoading={isLoading} />
        </Suspense>
      </Grid>
    </>
  );
}
