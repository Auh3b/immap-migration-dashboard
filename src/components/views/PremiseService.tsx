import { useEffect } from 'react';
import { SERVICE_CONCENTRATION_LAYER_ID } from 'components/layers/ServiceConcentrationLayer';
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import PremiseLeftView from './premiseViews/PremiseLeftView';
import PremiseRightView from './premiseViews/PremiseRightView';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import { StateSlices } from 'utils/types';
import FilterListIcon from '@material-ui/icons/FilterList';
import usePremiseSource from 'data/sources/premiseSource';
import PremiseFilters from './premiseViews/PremiseFilters';
import TuneIcon from '@material-ui/icons/Tune';

export default function PremiseService() {
  const dispatch = useDispatch();
  const selectPremiseByPhase = usePremiseSource();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const premiseSource = selectPremiseByPhase(phase || 1);
  useEffect(() => {
    dispatch(addSource(premiseSource));
    dispatch(
      addLayer({
        id: PREMISE_SERVICES_LAYER_ID,
        source: premiseSource.id,
      }),
    );
    dispatch(
      addLayer({
        id: SERVICE_CONCENTRATION_LAYER_ID,
        source: premiseSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID));
      dispatch(removeLayer(SERVICE_CONCENTRATION_LAYER_ID));
      dispatch(removeSource(premiseSource.id));
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
              content: <PremiseFilters />,
              value: 3,
              title: 'Filtros Adicionales',
              icon: <TuneIcon />,
            },
          ],
        },
        left: {
          element: (
            <PremiseLeftView
              dataSources={{ premiseSource: premiseSource.id }}
            />
          ),
          expandable: false,
        },
        right: {
          element: (
            <PremiseRightView
              dataSources={{ premiseSource: premiseSource.id }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
