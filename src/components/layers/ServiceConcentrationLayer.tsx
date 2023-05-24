import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// @ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { removeLayer, selectSourceById, updateLayer } from '@carto/react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';
import { LEGEND_TYPES } from '@carto/react-ui';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import getTileFeatures from 'utils/methods/getTileFeatures';

export const SERVICE_CONCENTRATION_LAYER_ID = 'serviceConcentrationLayer';

const legendConfig = {
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
};

export default function ServiceConcentrationLayer() {
  const dispatch = useDispatch();
  const { viewport } = useSelector((state: RootState) => state.carto);
  const { serviceConcentrationLayer, premiseServicesLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );

  const source = useSelector((state) =>
    selectSourceById(state, serviceConcentrationLayer?.source),
  );

  async function fetchData() {
    const data = await getTileFeatures({
      sourceId: source.id,
      params: {
        viewport,
        tileFormat: TILE_FORMATS.JSON,
        limit: null,
        filters: source.filters,
        filtersLogicalOperator: source.filtersLogicalOperator,
      },
    });
    return data;
  }

  useEffect(() => {
    dispatch(updateLayer(legendConfig));
    return () => {
      dispatch(removeLayer(SERVICE_CONCENTRATION_LAYER_ID));
    };
  }, []);

  if (serviceConcentrationLayer && premiseServicesLayer && source) {
    return new HeatmapLayer({
      id: SERVICE_CONCENTRATION_LAYER_ID,
      data: fetchData(),
      opacity: 0.8,
      getPosition: (d: any) => [d.longitude, d.latitude],
      getWeight: (d: any) => d.porc_sobre,
      intensity: 1,
      visible: serviceConcentrationLayer.visible,
      threshold: 0.3,
    });
  }
}
