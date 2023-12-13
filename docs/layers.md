# Layers

Most layers can use the carto layers as documented [here](https://docs.carto.com/carto-for-developers/carto-for-react/guides/layers)

However if there is a need to have implement a custom layer but preserve the interation between the map and widgets, you have the following option:

1. Extend the carto layer class
2. Extend the custom geojson layer
3. Develop a composite layer and add `onGeoJsonLoad`
