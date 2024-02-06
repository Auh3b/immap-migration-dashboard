import { lazy, useEffect, useState } from 'react';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { setError } from 'store/appSlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { fireStorage } from 'firedb';
import { useDispatch } from 'react-redux';
import executeMethod from 'components/indicators/media/hooks/executeMethod';
import { METHOD_NAMES } from './mediaViews/utils/methodName';
import { setIsMediaDataReady } from 'store/mediaSlice';
import SideAnalyticsPanel from 'components/common/sideAnalysticsPanel/Index';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import { StateSlices } from 'utils/types';
import MediaFilterToolbar from './mediaViews/mediaFilterToolbar/Index';
import { SideAnalyticsPanelProps } from 'components/common/sideAnalysticsPanel/sideAnalyticsPanelTypes';
import mediaSource from 'data/sources/mediaSource';

export const MediaMainView = lazy(() => import('./mediaViews/MediaMainView'));
const sidePanelProps: SideAnalyticsPanelProps = {
  showRoundSelector: false,
  children: [
    {
      content: <span>Methodology</span>,
      value: 1,
      title: 'Metodología',
      icon: <HelpOutlineIcon />,
    },
    {
      content: (
        <ActiveFilters filterSources={[{ stateSlice: StateSlices.MEDIA }]} />
      ),
      value: 2,
      title: 'Filtros Activos',
      icon: <FilterListIcon />,
    },
    {
      content: <MediaFilterToolbar />,
      value: 3,
      title: 'Filtros Adicionales',
      icon: <TuneIcon />,
    },
  ],
};
export default function Media() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMediaData = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchLayerData({
        ...mediaSource,
        source: mediaSource.data,
        format: 'json',
        headers: {
          'cache-control': 'max-age=300',
        },
      });
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
      <SideAnalyticsPanel {...sidePanelProps}></SideAnalyticsPanel>
      <MediaMainView isLoading={isLoading} />
    </>
  );
}
