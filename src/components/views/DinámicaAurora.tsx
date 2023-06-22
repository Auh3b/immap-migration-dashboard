import timelineSource from 'data/sources/timelineSource';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import { useEffect } from 'react';
import { SURVEY_TIMELINE_LAYER_ID } from 'components/layers/SurveyTimelineLayer';
import DinamicaLeftView from './dinamicaViews/DinamicaLeftView';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StateSlices } from 'utils/types';
import TuneIcon from '@material-ui/icons/Tune';
import DinamicaFilters from './dinamicaViews/DinamicaFilters';

export default function DinámicaAurora() {
  const dispatch = useDispatch();
  const sources = {
    timelineSource: timelineSource.id,
  };

  useEffect(() => {
    dispatch(addSource(timelineSource));

    dispatch(
      addLayer({
        id: SURVEY_TIMELINE_LAYER_ID,
        source: timelineSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_TIMELINE_LAYER_ID));
      dispatch(removeSource(timelineSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        side: [
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
        left: {
          element: <DinamicaLeftView dataSources={sources} />,
          expandable: false,
        },
      }}
    </MainView>
  );
}
