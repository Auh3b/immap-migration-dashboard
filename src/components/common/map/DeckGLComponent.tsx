// @ts-ignore
import DeckGL from '@deck.gl/react';
import { useSelector } from 'react-redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { BASEMAPS } from '@carto/react-basemaps';
import { Map } from 'react-map-gl';
import { RootState } from 'store/store';
import { useMapHooks } from './useMapHooks';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
// @ts-ignore
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
import { useRef } from 'react';
import useMapContext from 'context/useMapContext';
// @ts-ignore
maplibregl.workerClass = maplibreglWorker;

export default function DeckGLComponent({ layers }: { layers: any[] }) {
  const {setMapRef} = useMapContext()
  const mapRef = useRef(null)
  const viewState = useSelector((state: RootState) => state.carto.viewState);
  const basemap = useSelector(
    // @ts-ignore
    (state: RootState) => BASEMAPS[state.carto.basemap],
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    handleCursor,
    handleHover,
    handleSizeChange,
    handleTooltip,
    handleViewStateChange,
  } = useMapHooks();
  //@ts-ignore
  const handleOnLoad = () => (setMapRef(mapRef.current))

  return (
    // @ts-ignore
    <DeckGL
      viewState={{ ...viewState }}
      controller={true}
      layers={layers}
      onViewStateChange={handleViewStateChange}
      onResize={handleSizeChange}
      // @ts-ignore
      onHover={handleHover}
      getCursor={handleCursor}
      getTooltip={handleTooltip as any}
      pickingRadius={isMobile ? 10 : 0}
      ref={mapRef} 
      onLoad={handleOnLoad}
    >
      <Map
        id='main'
        mapLib={maplibregl}
        reuseMaps
        mapStyle={basemap.options.mapStyle}
        styleDiffing={false}
      />
    </DeckGL>
  );
}
