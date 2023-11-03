import MigrationRightView from './migrationViews/MigrationRightView';
import MigrationLeftView from './migrationViews/MigrationLeftView';
import useMainSource, { MAIN_SOURCE_ID } from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
import { setPageInfo } from 'store/mapSlice';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MigrationPageInfo from './migrationViews/MigrationPageInfo';
import { StateSlices } from 'utils/types';
import MigrationFilters from './migrationViews/MigrationFilters';
import TuneIcon from '@material-ui/icons/Tune';
import { ROUTE_PATHS } from 'routes';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase) || 1;
  const getMainSource = useMainSource();
  const sources = useMemo(
    () => ({
      mainSource: getMainSource(phase),
    }),
    [phase],
  );
  useEffect(() => {
    dispatch(addSource(sources.mainSource));

    dispatch(setPageInfo(ROUTE_PATHS.MIGRATION_FLOW));

    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: MAIN_SOURCE_ID,
      }),
    );
    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: MAIN_SOURCE_ID,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(MAIN_SOURCE_ID));
      dispatch(setPageInfo(null));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        side: [
          {
            content: <MigrationPageInfo />,
            value: 1,
            title: 'Metodología',
            icon: <HelpOutlineIcon />,
          },
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
            content: <MigrationFilters />,
            value: 3,
            title: 'Filtros Adicionales',
            icon: <TuneIcon />,
          },
        ],
        left: {
          element: (
            <MigrationLeftView
              dataSources={{ mainSource: { id: MAIN_SOURCE_ID } }}
            />
          ),
          expandable: false,
        },
        right: {
          element: phase !== 2 && (
            <MigrationRightView
              dataSources={{ mainSource: { id: MAIN_SOURCE_ID } }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
