interface getTileFeaturesProps {
  layerId: string
  viewport: any[]
  mapRef: any
}

export default function getTileFeatures({layerId, viewport, mapRef}:getTileFeaturesProps) {
  if(mapRef){
    const visibleFeatures = mapRef.pickObjects({
      x: 0,
      y: 0,
      width: mapRef.deck.width, // the mapRef stores the current height
      height: mapRef.deck.height, // and width, so you don't need to use the viewPort
      viewport,
      layerIds: [layerId]
    })

    if(visibleFeatures.length == 0){
      return {
        data: [],
        error: true
      } 
    }
    
    if(visibleFeatures.length > 0){
      const fullVisibleFeatures = visibleFeatures[0]
      
      return {
        //@ts-ignore
        data: fullVisibleFeatures.tile.dataInWGS84.map(f => f.properties),
        error: false
      }
      
      
    }
  }
}
