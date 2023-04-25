import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
// import { CartoLayer } from '@deck.gl/carto';
import { CompositeLayer, GeoJsonLayer } from 'deck.gl';
import { addLayer, removeLayer, selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import { LEGEND_TYPES } from '@carto/react-ui';
import { UNICEF_COLORS } from 'theme';
import { color, scaleSequential } from 'd3';
import { useEffect, useState } from 'react';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import premiseSource from 'data/sources/premiseSource';
import useCustomDataLoad from './hooks/useCustomDataLoad';
import d3Hex2RGB from 'utils/d3Hex2RGB';

export const PREMISE_SERVICES_LAYER_ID = 'premiseServicesLayer';

export const PREMISE_SERVICES_COLORS = {
  Punto: [...Object.values(color(UNICEF_COLORS[0])).slice(0, -1)],
};

const DATA = Object.entries(PREMISE_SERVICES_COLORS).map(([label, color]) => ({
  color,
  label,
}));

const getScaledColor = (value: number) => {
  const colorScale = scaleSequential(['#ffffb2', '#bd0026']).domain([0, 1]);
  const outputColor = colorScale(value);
  return d3Hex2RGB(color(outputColor).formatHex());
};

class CustomLayer extends CompositeLayer<any, any> {
  constructor(props: any) {
    super(props);
  }
  initializeState(params?: any): void {
    //@ts-ignore
    const { dispatch } = this.props;
    dispatch(
      addLayer({
        id: PREMISE_SERVICES_LAYER_ID + '_primary',
        layerAttributes: {
          title: 'Punto de servicio',
          visible: true,
          legend: {
            type: LEGEND_TYPES.CATEGORY,
            labels: DATA.map((data) => data.label),
            colors: DATA.map((data) => data.color),
            collapsible: false,
          },
        },
      }),
    );
    dispatch(
      addLayer({
        id: PREMISE_SERVICES_LAYER_ID + '_secondary',
        layerAttributes: {
          title: 'Punto de servicio',
          visible: true,
          legend: {
            type: LEGEND_TYPES.CONTINUOUS_RAMP,
            labels: [
              { label: 'BAJO', value: 0 },
              { label: 'ALTO', value: 1 },
            ],
            colors: [d3Hex2RGB('#ffffb2'), d3Hex2RGB('#bd0026')],
            collapsible: false,
          },
        },
      }),
    );
  }

  updateState({ oldProps, props, context, changeFlags }: any): void {
    //@ts-ignore
    if (changeFlags.dataChanged && this.props.data) {
      //@ts-ignore
      if (!this.state.data) {
        //@ts-ignore
        this.setState({
          //@ts-ignore
          data: this.props.data,
        });
      }

      //@ts-ignore
      this.props.onGeojsonDataLoad?.(this.props.data, {
        propName: 'data',
        layer: this,
      });
    }
  }

  finalizeState(): void {
    //@ts-ignore
    const { dispatch } = this.props;
    dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID + '_primary'));
    dispatch(removeLayer(PREMISE_SERVICES_LAYER_ID + '_secondary'));
  }

  renderLayers() {
    const {
      data,
      loadedLayers,
      //@ts-ignore
    } = this.props;
    const { premiseServicesLayer_primary, premiseServicesLayer_secondary } =
      loadedLayers;
    return [
      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: 'primary',
          data,
          pointType: 'circle',
          getFillColor: DATA.map((data) => data.color)[0],
          stroked: false,
          pointRadiusUnits: 'pixels',
          pickable: true,
          pointRadiusMinPixels: 4,
          visible: premiseServicesLayer_primary?.visible ?? true,
        }),
      ),

      new GeoJsonLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: 'secondary',
          data,
          pointType: 'circle',
          getFillColor: (d: any) => getScaledColor(d.properties.porc_sobre),
          stroked: false,
          pointRadiusUnits: 'pixels',
          pickable: true,
          pointRadiusMinPixels: 4,
          visible: premiseServicesLayer_secondary?.visible ?? true,
        }),
      ),
    ];
  }
}

export default function PremiseServicesLayer() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const layers = useSelector((state: RootState) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, layers.premiseServicesLayer?.source),
  );

  useEffect(() => {
    (async function fetchData() {
      const { data } = await fetchLayerData({
        ...premiseSource,
        source: premiseSource.data,
        format: 'geojson',
      });
      setData(data);
    })();
  }, []);

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: layers.premiseServicesLayer,
  });

  delete cartoLayerProps.onDataLoad;

  const [onGeojsonDataLoad] = useCustomDataLoad({ source });

  if (layers.premiseServicesLayer && source && data) {
    return new CustomLayer({
      ...cartoLayerProps,
      id: PREMISE_SERVICES_LAYER_ID,
      data: new Promise((resolve, reject) => resolve(data)),
      getFillColor: PREMISE_SERVICES_COLORS.Punto,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getLineColor: [124, 33, 62],
      pointRadiusMinPixels: 3,
      onGeojsonDataLoad,
      dispatch,
      loadedLayers: layers,
    });
  }
}
