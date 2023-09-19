import { useEffect } from 'react';
import serviceFeedbackNnaV2Source from 'data/sources/serviceFeedbackNnaV2Source';
import { SERVICI_FEEDBACK_NNA_LAYER_ID } from 'components/layers/ServiciFeedbackNnaLayer';
import serviceFeedbackV2Source from 'data/sources/serviceFeedbackV2Source';
import { SERVICIO_FEEDBACK_2_LAYER_ID } from 'components/layers/ServicioFeedback_2Layer';
import { useDispatch } from 'react-redux';
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

const useStyles = makeStyles(() => ({
  servicioFeedback_2: {},
}));

export default function ServicioFeedback2() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(serviceFeedbackV2Source));

    dispatch(
      addLayer({
        id: SERVICIO_FEEDBACK_2_LAYER_ID,
        source: serviceFeedbackV2Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SERVICIO_FEEDBACK_2_LAYER_ID));
      dispatch(removeSource(serviceFeedbackV2Source.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(serviceFeedbackNnaV2Source));

    dispatch(
      addLayer({
        id: SERVICI_FEEDBACK_NNA_LAYER_ID,
        source: serviceFeedbackNnaV2Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SERVICI_FEEDBACK_NNA_LAYER_ID));
      dispatch(removeSource(serviceFeedbackNnaV2Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        side: [
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
        left: {
          element: (
            <ServiceFeedbackLeftView
              classes={classes}
              dataSources={{ serviceFeedbackV2Source }}
            />
          ),
          expandable: false,
        },
        right: {
          element: (
            <ServiceFeedbackRightView
              classes={classes}
              dataSources={{ serviceFeedbackNnaV2Source }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
  );
}
