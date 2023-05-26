// @ts-ignore
import DeckGL from '@deck.gl/react';
import { useSelector } from 'react-redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { BASEMAPS } from '@carto/react-basemaps';
import { Map } from 'react-map-gl';
import { RootState } from 'store/store';
import { useMapHooks } from './useMapHooks';
//@ts-ignore
import { FlyToInterpolator } from '@deck.gl/core';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
// @ts-ignore
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
import useFeatureFocus from 'hooks/useFeatureFocus';
// @ts-ignore
maplibregl.workerClass = maplibreglWorker;

const transitionInterpolator = new FlyToInterpolator();

export default function DeckGLComponent({ layers }: { layers: any[] }) {
  const viewState = useSelector((state: RootState) => state.carto.viewState);
  // @ts-ignore
  const transition = useSelector((state) => state.map.transition);
  const basemap = useSelector(
    // @ts-ignore
    (state: RootState) => BASEMAPS[state.carto.basemap],
  );
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    handleCursor,
    handleHover,
    handleSizeChange,
    handleTooltip,
    handleViewStateChange,
  } = useMapHooks();
  // useFeatureFocus();
  return (
    // @ts-ignore
    <DeckGL
      viewState={{
        ...viewState,
        transitionDuration: transition ?? 0,
        transitionInterpolator,
      }}
      controller={true}
      layers={layers}
      onViewStateChange={handleViewStateChange}
      onResize={handleSizeChange}
      // @ts-ignore
      onHover={handleHover}
      getCursor={handleCursor}
      getTooltip={handleTooltip as any}
    >
      <Map
        mapLib={maplibregl}
        reuseMaps
        mapStyle={basemap.options.mapStyle}
        styleDiffing={false}
      />
    </DeckGL>
  );
}
