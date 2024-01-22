import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import mainSource from 'data/sources/mainSource';
import { lazy, useEffect } from 'react';
import useAggregateSource, {
  AGGREGATE_SERVICES_SOURCE_ID,
} from 'data/sources/aggregateServicesSource';
import useAggreateServiceChildrenSource, {
  AGGREATE_SERVICE_CHILDREN_SOURCE_ID,
} from 'data/sources/aggreateServiceChildrenSource';
import { AGGREGATE_SERVICE_LAYER_ID } from 'components/layers/AggregateServiceLayer';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AGGREGATE_SERVICES_CHILDREN_LAYER_ID } from 'components/layers/AggregateServicesChildrenLayer';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StateSlices } from 'utils/types';
import ServiceFiltersOld from './serviceViews/ServiceFiltersOld';
import TuneIcon from '@material-ui/icons/Tune';

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

  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const getAggregateSource = useAggregateSource();
  const getAggregateChildrenSource = useAggreateServiceChildrenSource();

  useEffect(() => {
    dispatch(addSource(getAggregateSource(phase)));

    dispatch(
      addLayer({
        id: AGGREGATE_SERVICE_LAYER_ID,
        source: AGGREGATE_SERVICES_SOURCE_ID,
      }),
    );

    return () => {
      dispatch(removeLayer(AGGREGATE_SERVICE_LAYER_ID));
      dispatch(removeSource(AGGREGATE_SERVICES_SOURCE_ID));
    };
  }, [dispatch, phase]);

  useEffect(() => {
    dispatch(addSource(getAggregateChildrenSource(phase)));

    dispatch(
      addLayer({
        id: AGGREGATE_SERVICES_CHILDREN_LAYER_ID,
        source: AGGREATE_SERVICE_CHILDREN_SOURCE_ID,
      }),
    );

    return () => {
      dispatch(removeLayer(AGGREGATE_SERVICES_CHILDREN_LAYER_ID));
      dispatch(removeSource(AGGREATE_SERVICE_CHILDREN_SOURCE_ID));
    };
  }, [dispatch, phase]);

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
              content: <ServiceFiltersOld />,
              value: 3,
              title: 'Filtros Adicionales',
              icon: <TuneIcon />,
            },
          ],
        },
        left: {
          element: (
            <ServiceLeftView
              classes={classes}
              dataSources={{
                mainSource,
                aggregateServicesSource: AGGREGATE_SERVICES_SOURCE_ID,
              }}
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
                aggregateServicesSource: AGGREGATE_SERVICES_SOURCE_ID,
                aggreateServiceChildrenSource:
                  AGGREATE_SERVICE_CHILDREN_SOURCE_ID,
              }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
