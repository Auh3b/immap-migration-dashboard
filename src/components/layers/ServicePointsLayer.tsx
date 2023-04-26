import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import { LEGEND_TYPES } from '@carto/react-ui';

export const SERVICE_POINTS_LAYER_ID = 'servicePointsLayer';

export const SERVICES_COLORS = {
  Services: [153, 63, 46],
};

const DATA = Object.entries(SERVICES_COLORS).map(([label, color]) => ({
  color,
  label,
}));

const layerConfig = {
  title: 'Services',
  visible: true,
  legend: {
    attr: 'hotspot',
    type: LEGEND_TYPES.CATEGORY,
    labels: DATA.map((data) => data.label),
    colors: DATA.map((data) => data.color),
    colllapsible: false,
  },
};

export default function ServicePointsLayer() {
  const dispatch = useDispatch();
  const { servicePointsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, servicePointsLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: servicePointsLayer,
  });

  if (servicePointsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SERVICE_POINTS_LAYER_ID,
      getFillColor: [55, 255, 190],
      pointRadiusMinPixels: 2,
      pickable: true,
      onDataLoad: (data: any) => {
        dispatch(
          updateLayer({
            id: SERVICE_POINTS_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
    });
  }
}
