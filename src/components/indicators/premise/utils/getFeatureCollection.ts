import { Feature, featureCollection } from "@turf/helpers"

export default function getFeatureCollection({input, filterFunction, coordinateLocation
}:{
  input: any[],
  coordinateLocation: (value: any, index:number) => Feature
  filterFunction?: (value: any, index?:number) => unknown,
}) {

  let _data = [...input]
  
  if(filterFunction){
    _data = _data.filter(filterFunction)
  }

  let dataWithCoordinates:Feature[] = _data.map(coordinateLocation)
  let geojson = featureCollection(dataWithCoordinates)
  return geojson
}
