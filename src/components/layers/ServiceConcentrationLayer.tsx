import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { removeLayer, updateLayer } from '@carto/react-redux';
import { RootState } from 'store/store';
import premiseSource from 'data/sources/premiseSource';
import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from './SurveyConcentrationsLayer';

export const SERVICE_CONCENTRATION_LAYER_ID = 'serviceConcentrationLayer';

export default function ServiceConcentrationLayer() {
  const dispatch = useDispatch();
  // const [data, setData] = useState(null);
  const { serviceConcentrationLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );

  // const fetchData = async () => {
  //   const { data } = await fetchLayerData({
  //     ...premiseSource,
  //     source: premiseSource.data,
  //     format: 'json',
  //   });
  //   setData(data);
  // };

  const {data} = useWidgetFetch({
    id: SURVEY_CONCENTRATIONS_LAYER_ID,
    dataSource: premiseSource.id
  })

  useEffect(() => {
    // fetchData();
     dispatch(
          updateLayer({
            id: SERVICE_CONCENTRATION_LAYER_ID,
            layerAttributes: {
              title: 'Alertas por servicio',
              legend: {
                type: LEGEND_TYPES.CONTINUOUS_RAMP,
                labels: [
                  {
                    label: 'Bajo',
                    value: 0,
                  },
                  {
                    label: 'sobrepasando',
                    value: 1,
                  },
                ],
                colors: [d3Hex2RGB('#ffffb2'), d3Hex2RGB('#bd0026')],
                collapsible: false,
              },
            },
          }),
        );
    return () => {
      dispatch(removeLayer(SERVICE_CONCENTRATION_LAYER_ID));
    };
  }, []);

  console.log(data)

  if (serviceConcentrationLayer && data.length> 0) {
    return new HeatmapLayer({
      id: SERVICE_CONCENTRATION_LAYER_ID,
      data: new Promise((resolve) => resolve(data)),
      opacity: 0.8,
      getPosition: (d: any) => [d.long, d.lat],
      getWeight: (d: any) => d.porc_sobre,
      intensity: 1,
      visible: serviceConcentrationLayer.visible,
      threshold: 0.3,
    });
  }
}
