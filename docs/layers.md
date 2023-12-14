# Layers

Most layers can use the carto layers as documented [here](https://docs.carto.com/carto-for-developers/carto-for-react/guides/layers). The carto layer is essentially a function that can modefied deckGL geojson layer with extended integration to the redux state management and data worker. As such it can handle most data general vector geometries such as points, line, and polygon.

However if there is a need to have implement a custom layer but preserve the interation between the map and indicators. Since carto layer is an extension of geojson layer, it too can be extend.(See [here](https://deck.gl/docs/developer-guide/custom-layers) how layer extension works)

## 1. Develop a composite layer

## 2. Extending the carto layer class

This involves creating a custom layer by extending the carto layer
