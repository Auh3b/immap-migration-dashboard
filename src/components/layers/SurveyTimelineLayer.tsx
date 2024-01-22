import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
// @ts-ignore
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
//@ts-ignore
//@ts-ignore
import useTimelineSource from 'data/sources/timelineSource';
import { useEffect, useState } from 'react';
import useCustomDataLoad from './hooks/useCustomDataLoad';
import { iconGroupsConfig } from './utils/surveyIconGroup';
import CustomTimelineLayer from './CustomLayer/CustomTimelineLayer';

export const SURVEY_TIMELINE_LAYER_ID = 'surveyTimelineLayer';

export default function SurveyTimelineLayer() {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase) || 1;
  const getTimelineSource = useTimelineSource();
  const [data, setData] = useState<null | any[]>(null);
  const { layers: loadedLayers } = useSelector(
    (state: RootState) => state.carto,
  );
  const { surveyTimelineLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, surveyTimelineLayer?.source),
  );

  useEffect(() => {
    (async function fetchData() {
      const timelineSource = getTimelineSource(phase);
      const { data } = await fetchLayerData({
        type: timelineSource.type,
        connection: timelineSource.connection,
        source: timelineSource.data,
        format: 'geojson',
        headers: {
          'cache-control': 'max-age=300',
        },
      });
      setData(data);
    })();
    return () => {
      setData(null);
    };
  }, [phase]);

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: surveyTimelineLayer,
  });
  //@ts-ignore
  delete cartoLayerProps.onDataLoad;
  const [onGeojsonLoad] = useCustomDataLoad({ source });
  if (surveyTimelineLayer && source && data) {
    return new CustomTimelineLayer({
      ...cartoLayerProps,
      data: new Promise((resolve, reject) => {
        resolve(data);
      }),
      id: SURVEY_TIMELINE_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      phase,
      dispatch,
      source,
      loadedLayers,
      onGeojsonLoad,
      iconGroups: [...iconGroupsConfig],
    });
  }
}
