import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import mainSource from 'data/sources/mainSource';
import { lazy, useEffect } from 'react';
import aggregateServicesSource from 'data/sources/aggregateServicesSource';
import aggreateServiceChildrenSource from 'data/sources/aggreateServiceChildrenSource';
import { AGGREGATE_SERVICE_LAYER_ID } from 'components/layers/AggregateServiceLayer';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { useDispatch } from 'react-redux';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
import { AGGREGATE_SERVICES_CHILDREN_LAYER_ID } from 'components/layers/AggregateServicesChildrenLayer';

const ServiceLeftView = lazy(() => import('./serviceViews/ServiceLeftView'));
const ServicesRightView = lazy(
  () => import('./serviceViews/ServicesRightView'),
);

const useViewStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  divider: {
    paddingBottom: 0,
  },
}));

export default function Services() {
  const dispatch = useDispatch();
  const classes = useViewStyle();

  useEffect(() => {
    dispatch(addSource(aggregateServicesSource));

    dispatch(
      addLayer({
        id: AGGREGATE_SERVICE_LAYER_ID,
        source: aggregateServicesSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(AGGREGATE_SERVICE_LAYER_ID));
      dispatch(removeSource(aggregateServicesSource.id));
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
          element: (
            <ServiceLeftView
              classes={classes}
              dataSources={{ mainSource, aggregateServicesSource }}
            />
          ),
          expandable: false,
        },
        right: {
          element: (
            <ServicesRightView
              classes={classes}
              dataSources={{
                mainSource,
                aggregateServicesSource,
                aggreateServiceChildrenSource,
              }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
