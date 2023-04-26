import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { addLayer, removeLayer, updateLayer } from '@carto/react-redux';
import { RootState } from 'store/store';
import premiseSource from 'data/sources/premiseSource';
import { useEffect, useState } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import d3Hex2RGB from 'utils/d3Hex2RGB';

export const SERVICE_CONCENTRATION_LAYER_ID = 'serviceConcentrationLayer';

export default function ServiceConcentrationLayer() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { serviceConcentrationLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );

  const fetchData = async () => {
    const { data } = await fetchLayerData({
      ...premiseSource,
      source: premiseSource.data,
      format: 'json',
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(removeLayer(SERVICE_CONCENTRATION_LAYER_ID));
    };
  }, []);

  if (serviceConcentrationLayer && data) {
    return new HeatmapLayer({
      id: SERVICE_CONCENTRATION_LAYER_ID,
      data: new Promise((resolve) => resolve(data)),
      pickable: false,
      opacity: 0.8,
      getPosition: (d: any) => d.geom.coordinates,
      getWeight: (d: any) => d.porc_sobre,
      intensity: 1,
      visible: serviceConcentrationLayer.visible,
      threshold: 0.3,
      onDataLoad: () => {
        dispatch(
          updateLayer({
            id: SERVICE_CONCENTRATION_LAYER_ID,
            layerAttributes: {
              title: 'Service Concentration',
              legend: {
                attr: 'hotspot',
                type: LEGEND_TYPES.CONTINUOUS_RAMP,
                labels: [
                  {
                    label: 'Bajo',
                    value: 0,
                  },
                  {
                    label: 'Bajo',
                    value: 1,
                  },
                ],
                colors: [d3Hex2RGB('#ffffb2'), d3Hex2RGB('#bd0026')],
                collapsible: false,
              },
            },
          }),
        );
      },
    });
  }
}
