import { FeatureCollection } from "@turf/helpers"
import { bbox } from "@turf/turf"
//@ts-ignore
import { WebMercatorViewport } from '@deck.gl/core';

export default function getViewport({
  geojson,
  padding,
  width,
  height
}:{
  geojson: FeatureCollection
  padding: number
  width: number
  height: number
}) {
  const [minLong, minLat, maxLong, maxLat] = bbox(geojson);
        const boundbox = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];
  //@ts-ignore
  const { latitude, longitude, zoom } =
    new WebMercatorViewport().fitBounds(boundbox, {
      width,
      height,
      padding,
    });
  
  return {
    latitude, longitude, zoom
  }
}
