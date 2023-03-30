import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
//@ts-ignore
import { RootState } from 'store/store';
import { addLayer, removeLayer, selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { format, scaleLinear } from 'd3';
import distance from '@turf/distance';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import { LEGEND_TYPES } from '@carto/react-ui';

const layerStyle = new Map([
  ['País de nacimiento', d3Hex2RGB(1)],
  ['País donde inició el flujo migratorio', d3Hex2RGB(4)],
  ['País donde vivía hace un año', d3Hex2RGB(7)],
]);

type coordinates = [number, number];

const tripLength = (a: [number, number], b: [number, number]): number =>
  distance(a, b, { units: 'kilometers' });

const heightScale = scaleLinear().range([0.75, 0]).domain([0, 40075]);

const getHeight = (a: coordinates, b: coordinates) => {
  const distance = tripLength(a, b);
  const distanceScaled = heightScale(distance);
  return +format('.2f')(distanceScaled);
};

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

//@ts-ignore
class TravelLayer extends CompositeLayer <any, any>{
  constructor(props: Record<any,any>) {
    super(props);
  }

  
  checkLayerConfig(layer: string){
    //@ts-ignore
    const { loadedLayers } = this.props
    
    return loadedLayers[layer] ? true : false
  }

  checkVisibility(layer:string){
    const isLoaded = this.checkLayerConfig(layer)
    if(isLoaded){
      //@ts-ignore
      const { loadedLayers } = this.props 
      return loadedLayers[layer].visible
    }

    return false
  }

  setCompositeLayerLegends(){
    //@ts-ignore
    const { id, dispatch, source} = this.props
    let layerLegends:any = []
    for (let [name, color] of  Array.from(layerStyle)){
      const layerId = `${id}-${name}`
      const isLoaded = this.checkLayerConfig(layerId)
      if(!isLoaded){
        const layerConfig = {
          id: layerId,
          source,
          layerAttributes:{
            title: `${name}`,
            visible: true,
            legend:{
              type: LEGEND_TYPES.CATEGORY,
              labels: [name],
              colors: [color],
              collapsible: false,
            }
          }
        }
        dispatch(addLayer(layerConfig))
        layerLegends = [ ...layerLegends, layerConfig]
      }
    }
    this.setState({
      layerLegends
    })
  }

  initializeState() {
    //@ts-ignore
    this.setCompositeLayerLegends()
  }

  finalizeState(){
    //@ts-ignore
    const { layerLegends } = this.state
    //@ts-ignore
    const { dispatch } = this.props
    
    for (let { id } of layerLegends){
      dispatch(removeLayer(id))
    }
  }


  //@ts-ignore
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const {
      id,
      data,
      getSourcePosition,
      getTargetPosition,
      getWidth,
      getHeight,
      getTilt,
      pickable,
      //@ts-ignore
    } = this.props;
    const layerName = Array.from(layerStyle.keys());
    const layerColor = Array.from(layerStyle.values());
    return [
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[0],
          data,
          getSourcePosition,
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: this.checkVisibility(`${id}-${layerName[0]}`),
          getSourceColor: layerColor[0],
          getTargetColor: layerColor[0],
          pickable,
        }),
      ),
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[1],
          data,
          getSourcePosition: (d: any) => [+d['long_paisi'], d['lat_paisin']],
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: this.checkVisibility(`${id}-${layerName[1]}`),
          getSourceColor: layerColor[1],
          getTargetColor: layerColor[1],
          pickable,
        }),
      ),
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[2],
          data,
          getSourcePosition: (d: any) => [+d['long_paisv'], d['lat_paisvi']],
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: this.checkVisibility(`${id}-${layerName[2]}`),
          getSourceColor: layerColor[2],
          getTargetColor: layerColor[2],
          pickable,
        }),
      ),
    ];
  }
}

const filterCoordinates = (d: any) => {
  return (
    +d['long_paisn'] !== 999999 &&
    +d['lat_paisna'] !== 999999 &&
    +d['lon_eng'] !== 999999 &&
    +d['lat_eng'] !== 999999 &&
    +d['long_paisv'] !== 999999 &&
    +d['long_paisv'] !== 999999 &&
    +d['long_paisi'] !== 999999 &&
    +d['lat_paisvi'] !== 999999
  );
};

const getArcHeight = (d: any) => {
  return {
    ...d,
    arcHeight:
      getHeight(
        [+d['long_paisn'], +d['lat_paisna']],
        [d['lon_eng'], d['lat_eng']],
      ) || 0.5,
  };
};

export default function MigrationFlowLayer() {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const dispatch = useDispatch();
  const {  layers: loadedLayers } = useSelector((state: RootState) => state.carto)
  const { hotspotsLayer, migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, migrationFlowLayer?.source),
  );

  async function fetchData() {
    const data = await getTileFeatures({
      sourceId: source.id,
      params: {
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON,
        limit: null,
        filters: source.filters,
        filtersLogicalOperator: source.filtersLogicalOperator,
      },
    });
    return data.filter(filterCoordinates).map(getArcHeight);
  }

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: migrationFlowLayer,
  });
  delete cartoLayerProps.onDataLoad;

  if (hotspotsLayer && migrationFlowLayer && source) {
    return new TravelLayer({
      ...cartoLayerProps,
      data: fetchData(),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => [+d['long_paisn'], d['lat_paisna']],
      getTargetPosition: (d: any) => [d['lon_eng'], d['lat_eng']],
      getWidth: 1,
      getHeight: 1,
      getTilt: 0,
      pickable: true,
      dispatch,
      loadedLayers,
      source
    });
  }
}