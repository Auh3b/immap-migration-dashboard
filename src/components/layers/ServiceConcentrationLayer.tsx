import { useSelector } from 'react-redux';
//@ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { RootState } from 'store/store';
import premiseSource from 'data/sources/premiseSource'
import { useEffect, useState } from 'react';

export const SERVICE_CONCENTRATION_LAYER_ID = 'serviceConcentrationLayer';

export default function ServiceConcentrationLayer() {
  const [data, setData] = useState(null)
  const { serviceConcentrationLayer } = useSelector((state: RootState) => state.carto.layers);

  const fetchData =async () => {
    const { data } = await fetchLayerData({
        ...premiseSource,
        source: premiseSource.data,
        format: 'json',
      });
   setData(data)
  }

  useEffect(()=>{
    fetchData()
  }, [])

  console.log(serviceConcentrationLayer)

  if (serviceConcentrationLayer && data) {
    return new HeatmapLayer({
      id: SERVICE_CONCENTRATION_LAYER_ID,
      data: new Promise((resolve) => resolve(data)),
      pickable: false,
      opacity: 0.8,
      getPosition: (d:any) => d.geom.coordinates,
      getWeight: (d:any) => d.porc_sobre,
      intensity: 1,
      threshold: 0.3,
      onDataLoad:(data:any, context:any)=>{
        console.log(data)
      }
    });
  }
}
