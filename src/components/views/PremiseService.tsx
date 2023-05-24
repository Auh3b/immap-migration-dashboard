import { useEffect } from 'react';
import { SERVICE_CONCENTRATION_LAYER_ID } from 'components/layers/ServiceConcentrationLayer';
import premiseSource from 'data/sources/premiseSource';
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import MainView from './main/MainView';
import PremiseLeftView from './premiseViews/PremiseLeftView';
import PremiseRightView from './premiseViews/PremiseRightView';

export default function PremiseService() {
  const dispatch = useDispatch();

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
