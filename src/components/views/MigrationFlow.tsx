import MigrationRightView from './migrationViews/MigrationRightView';
import MigrationLeftView from './migrationViews/MigrationLeftView';
import mainSource from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
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

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addSource(mainSource));

    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );
    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(removeLayer(HOTSPOTS_LAYER_ID));
      dispatch(removeSource(mainSource.id));
      dispatch(setPageInfo({}));
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
        ],
        left: {
          element: <MigrationLeftView dataSources={{ mainSource }} />,
          expandable: false,
        },
        right: {
          element: <MigrationRightView dataSources={{ mainSource }} />,
          expandable: false,
        },
      }}
    </MainView>
  );
}
