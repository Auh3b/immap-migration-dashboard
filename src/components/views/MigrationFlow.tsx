import mainSource from '../../data/sources/mainSource';
import MainView from './main/MainView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  addLayer,
  addSource,
  removeLayer,
  setViewState,
} from '@carto/react-redux';
import { MIGRATION_FLOW_LAYER_ID } from 'components/layers/MigrationFlowLayer';
import { MainColumnView } from 'components/common/MainColumnView';
import OriginCountry from 'components/common/indicators/migration/OriginCountry';
import CountryDeparted from 'components/common/indicators/migration/CountryDeparted';
import CountryResiding  from 'components/common/indicators/migration/CountryResiding';
import TransportMode from 'components/common/indicators/migration/TransportMode';
import { TransitStopLength } from 'components/common/indicators/migration/TransitStopLength';
import TransitStopReason from 'components/common/indicators/migration/TransitStopReason';
import TransitInfomation from 'components/common/indicators/migration/TransitInfomation';

export default function MigrationFlow() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setViewState({ pitch: 30 }));
    dispatch(addSource(mainSource));
    dispatch(
      addLayer({
        id: MIGRATION_FLOW_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(MIGRATION_FLOW_LAYER_ID));
      dispatch(setViewState({ pitch: 0 }));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <LeftView />,
        right: <RightView />,
      }}
    </MainView>
  );
}

function LeftView() {
  return (
    <MainColumnView>
      <OriginCountry dataSource={mainSource.id} />
      <CountryDeparted dataSource={mainSource.id} />
      <CountryResiding dataSource={mainSource.id} />
      <TransportMode dataSource={mainSource.id} />
    </MainColumnView>
  );
}

function RightView() {
  return (
    <MainColumnView>
      <TransitStopReason dataSource={mainSource.id} />
      <TransitStopLength dataSource={mainSource.id} />
      <TransitInfomation dataSource={mainSource.id} />
    </MainColumnView>
  );
}
