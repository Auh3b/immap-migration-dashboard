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

import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import PremiseLeftView from './premiseViews/PremiseLeftView';
import PremiseRightView from './premiseViews/PremiseRightView';
import PremiseMiddleView from './premiseViews/PremiseMiddleView';

const useStyles = makeStyles(() => ({
  premiseService: {},
}));

export default function PremiseService() {
  const dispatch = useDispatch();
  const classes = useStyles();

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
        left: (
          <PremiseLeftView dataSources={{ premiseSource: premiseSource.id }} />
        ),
        right: (
          <PremiseRightView dataSources={{ premiseSource: premiseSource.id }} />
        ),
        middle: (
          <PremiseMiddleView
            dataSources={{ premiseSource: premiseSource.id }}
          />
        ),
      }}
    </MainView>
  );
}
