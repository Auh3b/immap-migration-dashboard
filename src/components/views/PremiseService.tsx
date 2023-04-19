import { useEffect } from 'react';
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
import PremiseMiddleView from './premiseViews/PremiseMiddleView';

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

    return () => {
      dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID));
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
        },
        right: {
          element: (
            <PremiseRightView
              dataSources={{ premiseSource: premiseSource.id }}
            />
          ),
          expandable: true,
        },
        middle: {
          element: (
            <PremiseMiddleView
              dataSources={{ premiseSource: premiseSource.id }}
            />
          ),
        },
      }}
    </MainView>
  );
}
