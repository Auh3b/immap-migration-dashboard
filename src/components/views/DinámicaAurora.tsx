import { makeStyles } from '@material-ui/core/styles';
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
import DinamicaMiddleView from './dinamicaViews/DinamicaMiddleView';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  dinámicaAurora: {},
}));

export default function DinámicaAurora() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sources = {
    premiseSource: premiseSource.id
  }
  
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
        middle: <DinamicaMiddleView  dataSources={sources}/>
      }}
    </MainView>
  );
}
