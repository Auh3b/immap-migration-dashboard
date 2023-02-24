import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer, FORMATS,fetchLayerData, MAP_TYPES } from '@deck.gl/carto';
//@ts-ignore
import { CompositeLayer } from 'deck.gl'
//@ts-ignore
import { GeoJsonLayer } from '@deck.gl/layers'
import { selectSourceById } from '@carto/react-redux';
import { executeSQL, useCartoLayerProps } from '@carto/react-api';
import { RootState } from 'store/store';
import SuperCluster from 'supercluster'
import { useEffect, useState } from 'react';
import hotSpotSource from 'data/sources/hotspotSource'

export const SURVEY_CONCENTRATIONS_LAYER_ID = 'surveyConcentrationsLayer';

function getIconSize(size:number) {
  return Math.min(100, size) / 100 + 1;
}

class CircleClusterLayer extends CompositeLayer {
  constructor(props:any){
    super(props)
  }
  //@ts-ignore
  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }
  //@ts-ignore
  updateState({props, oldProps, context, changeFlags}) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (rebuildIndex) {
      const index = new SuperCluster({maxZoom: 16, radius: props.sizeScale});
      index.load(
        //@ts-ignore
        props.data.features.map(d => ({
          geometry: {coordinates: props.getPosition(d)},
          properties: d
        }))
      );
      //@ts-ignore
      this.setState({index});
    }

    //@ts-ignore
    const z = Math.floor(this.context.viewport.zoom);
    //@ts-ignore
    if (rebuildIndex || z !== this.state.z) {
      //@ts-ignore
      this.setState({
        //@ts-ignore
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z
      });
    }
  }
  renderLayers() {
    //@ts-ignore
    const data = {type: 'FeatureCollection', features: this.state.data}
    console.log(data)
    //@ts-ignore
    const {sizeScale, getFillColor, id} = this.props;

    return new GeoJsonLayer(
      //@ts-ignore
      this.getSubLayerProps({
        id,
        data,
        sizeScale,
        getFillColor,
        pointType: 'circle',
        //@ts-ignore
        // getPosition: d => d.geometry.coordinates,
        //@ts-ignore
        getPointRadius: d => (d.properties.cluster ? d.properties.point_count*1000 : 100)
      })
    );
  }
}

export default function SurveyConcentrationsLayer() {
  const [data, setData] = useState(null)
  const { surveyConcentrationsLayer } = useSelector((state: RootState) => state.carto.layers);

  useEffect(() => {
    (async function(){
      const {data} = await fetchLayerData({
      source: hotSpotSource.data,
      ...hotSpotSource,  
      format: FORMATS.GEOJSON
      })

      //@ts-ignore
      setData(data)
    })()
  
    return () => {
      setData(null)
    }
  }, [])
  
  
  // const cartoLayerProps = useCartoLayerProps({ source });

  if (surveyConcentrationsLayer && data) {
    return new CircleClusterLayer({
      data,
      id: SURVEY_CONCENTRATIONS_LAYER_ID,
      getFillColor: [55, 265, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      sizeScale: 60,
      //@ts-ignore
      getPosition: d => d.geometry.coordinates
    });
  }
}
