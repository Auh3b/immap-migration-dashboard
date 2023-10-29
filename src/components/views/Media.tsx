import { lazy, useEffect, useState } from 'react';
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

export const MediaMainView = lazy(() => import('./mediaViews/MediaMainView'));

export default function Media() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMediaData = async () => {
    setIsLoading(true);
    try {
      const dataRef = ref(
        fireStorage,
        'data/summarised_meltwater_data_v14.json',
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
              <ActiveFilters
                filterSources={[{ stateSlice: StateSlices.MEDIA }]}
              />
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
        ]}
      </SideAnalyticsPanel>
      <MediaMainView isLoading={isLoading} />
    </>
  );
}
