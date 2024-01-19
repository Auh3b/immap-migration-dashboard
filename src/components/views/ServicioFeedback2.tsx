import { useEffect } from 'react';
import useFeedbackNnaSource, {
  SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
} from 'data/sources/serviceFeedbackNnaV2Source';
import { SERVICI_FEEDBACK_NNA_LAYER_ID } from 'components/layers/ServiciFeedbackNnaLayer';
import { SERVICIO_FEEDBACK_2_LAYER_ID } from 'components/layers/ServicioFeedback_2Layer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StateSlices } from 'utils/types';
import ServiceFeedbackLeftView from './serviceViews/ServiceFeedbackLeftView';
import ServiceFeedbackRightView from './serviceViews/ServiceFeedbackRightView';
import TuneIcon from '@material-ui/icons/Tune';
import ServiceFilters from './serviceViews/ServiceFilters';
import useFeedbackSource, {
  SERVICE_FEEDBACK_V2_SOURCE_ID,
} from 'data/sources/serviceFeedbackV2Source';

const useStyles = makeStyles(() => ({
  servicioFeedback_2: {},
}));

export default function ServicioFeedback2() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const classes = useStyles();
  const getAdultSource = useFeedbackSource();
  const getChildSource = useFeedbackNnaSource();

  useEffect(() => {
    dispatch(addSource(getAdultSource(phase)));
    dispatch(addSource(getChildSource(phase)));

    return () => {
      dispatch(removeSource(SERVICE_FEEDBACK_V2_SOURCE_ID));
      dispatch(removeSource(SERVICE_FEEDBACK_NNA_V2_SOURCE_ID));
    };
  }, [dispatch, phase]);

  useEffect(() => {
    dispatch(
      addLayer({
        id: SERVICIO_FEEDBACK_2_LAYER_ID,
        source: SERVICE_FEEDBACK_V2_SOURCE_ID,
      }),
    );

    dispatch(
      addLayer({
        id: SERVICI_FEEDBACK_NNA_LAYER_ID,
        source: SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
      }),
    );

    return () => {
      dispatch(removeLayer(SERVICIO_FEEDBACK_2_LAYER_ID));
      dispatch(removeLayer(SERVICI_FEEDBACK_NNA_LAYER_ID));
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
              content: <ServiceFilters />,
              value: 3,
              title: 'Filtros Adicionales',
              icon: <TuneIcon />,
            },
          ],
        },
        left: {
          element: (
            <ServiceFeedbackLeftView
              classes={classes}
              dataSources={{
                serviceFeedbackV2Source: SERVICE_FEEDBACK_V2_SOURCE_ID,
              }}
            />
          ),
          expandable: false,
        },
        right: {
          element: (
            <ServiceFeedbackRightView
              classes={classes}
              dataSources={{
                serviceFeedbackNnaV2Source: SERVICE_FEEDBACK_NNA_V2_SOURCE_ID,
              }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
