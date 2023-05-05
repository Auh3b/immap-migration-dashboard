import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { useEffect } from 'react';
import aggreateServiceChildrenSource from 'data/sources/aggreateServiceChildrenSource';
import { AGGREGATE_SERVICES_CHILDREN_LAYER_ID } from 'components/layers/AggregateServicesChildrenLayer';
import premiseSource from 'data/sources/premiseSource';
import { PREMISE_SERVICES_LAYER_ID } from 'components/layers/PremiseServicesLayer';
import MainView from './main/MainView';
import ChildrenLeftView from './childrenViews/ChildrenLeftView';
import ChildrenRightView from './childrenViews/ChildrenRightView';
import mainSource from 'data/sources/mainSource';
import aggreagateServicesChildrenSource from 'data/sources/aggreateServiceChildrenSource';
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
    aggreagateChildren: aggreagateServicesChildrenSource.id,
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

  useEffect(() => {
    dispatch(addSource(aggreateServiceChildrenSource));

    dispatch(
      addLayer({
        id: AGGREGATE_SERVICES_CHILDREN_LAYER_ID,
        source: aggreateServiceChildrenSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(AGGREGATE_SERVICES_CHILDREN_LAYER_ID));
      dispatch(removeSource(aggreateServiceChildrenSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: {
          element: <ChildrenLeftView dataSources={sources} classes={classes} />,
          expandable: false,
        },
        right: {
          element: (
            <ChildrenRightView dataSources={sources} classes={classes} />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
