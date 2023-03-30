import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { useEffect } from 'react';
import premiseSource from 'data/sources/premiseSource';
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
import MainView from './main/MainView';
import ChildrenLeftView from './childrenViews/ChildrenLeftView';
import ChildrenRightView from './childrenViews/ChildrenRightView';
import mainSource from 'data/sources/mainSource';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';

const useViewStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  divider: {
    paddingBottom: 0,
  },
}));

export default function Nna() {
  const dispatch = useDispatch();
  const classes = useViewStyle();

  const sources = {
    mainSource: mainSource.id,
    premiseSource: premiseSource.id,
  };

  useEffect(() => {
    dispatch(addSource(premiseSource));
    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: PREMISE_SERVICES_LAYER_ID,
        source: premiseSource.id,
      }),
    );
    dispatch(
      addLayer({
        id: HOTSPOTS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID));
      dispatch(removeSource(premiseSource.id));
      dispatch(removeSource(mainSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <ChildrenLeftView dataSources={sources} classes={classes} />,
        right: <ChildrenRightView dataSources={sources} classes={classes} />,
      }}
    </MainView>
  );
}
