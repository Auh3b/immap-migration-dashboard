import useTimelineSource from 'data/sources/timelineSource';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import { useEffect, useMemo } from 'react';
import { SURVEY_TIMELINE_LAYER_ID } from 'components/layers/SurveyTimelineLayer';
import DinamicaLeftView from './dinamicaViews/DinamicaLeftView';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StateSlices } from 'utils/types';
import TuneIcon from '@material-ui/icons/Tune';
import DinamicaFilters from './dinamicaViews/DinamicaFilters';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';
import { setPageInfo } from 'store/mapSlice';
import { ROUTE_PATHS } from 'routes';

export default function DinámicaAurora() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const getTimelineSource = useTimelineSource();
  const sources = useMemo(
    () => ({
      timelineSource: getTimelineSource(phase),
    }),
    [phase],
  );

  useEffect(() => {
    dispatch(addSource(sources.timelineSource));
    dispatch(setPageInfo(ROUTE_PATHS.DINÁMICA_AURORA));
    dispatch(
      addLayer({
        id: SURVEY_TIMELINE_LAYER_ID,
        source: SOURCE_NAMES.TIMELINE_SOURCE,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_TIMELINE_LAYER_ID));
      dispatch(removeSource(SOURCE_NAMES.TIMELINE_SOURCE));
      dispatch(setPageInfo(null));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        side: {
          children: [
            {
              content: (
                <ActiveFilters
                  filterSources={[{ stateSlice: StateSlices.CARTO }]}
                />
              ),
              value: 2,
              title: 'Filtros Activos',
              icon: <FilterListIcon />,
            },
            {
              content: <DinamicaFilters />,
              value: 3,
              title: 'Filtros Adicionales',
              icon: <TuneIcon />,
            },
          ],
        },
        left: {
          element: (
            <DinamicaLeftView
              dataSources={{ timelineSource: SOURCE_NAMES.TIMELINE_SOURCE }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
