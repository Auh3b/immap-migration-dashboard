import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { GeoJsonLayer } from '@deck.gl/layers';
import americaFeatureCollection from './americas';
import { Grid, makeStyles } from '@material-ui/core';
import getViewport from 'components/indicators/premise/utils/getViewport';
//@ts-ignore
import { FlyToInterpolator } from '@deck.gl/core';
import { useSelector } from 'react-redux';
import phaseDataSelector from './utils/phaseDataSelector';

const INITIAL_VIEW_STATE = {
  latitude: 8.62581290990417,
  longitude: -81.39079408436801,
  zoom: 2,
  maxZoom: 16,
};

interface _MapContext {
  details?: Record<string, unknown>;
  setDetails?: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const MapContext = createContext<_MapContext>({});

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}));

export default function PhaseDeckMap() {
  const classes = useStyles();
  const [details, setDetails] = useState<Record<string, unknown>>({
    viewState: INITIAL_VIEW_STATE,
  });
  return (
    <Grid item className={classes.root}>
      <MapContext.Provider value={{ details, setDetails }}>
        <DeckMapContainer />
      </MapContext.Provider>
    </Grid>
  );
}

const transitionInterpolator = new FlyToInterpolator();
function DeckMapContainer() {
  const { viewState } = useContext(MapContext).details;
  return (
    // @ts-ignore
    <DeckGL
      initialViewState={{
        // @ts-ignore
        ...viewState,
        transitionDuration: 500,
        transitionInterpolator,
      }}
      controller
      layers={[SurveySitesLayer(), CountriesLayer()]}
    />
  );
}

function CountriesLayer() {
  return new GeoJsonLayer({
    id: 'countries',
    data: americaFeatureCollection,
    getFillColor: [0, 0, 0, 0],
    stroked: true,
    getLineColor: [0, 0, 0, 255],
    getLineWidth: 1,
    lineWidthMinPixels: 0.5,
  });
}

const sitePhases = {
  1: {
    type: 'query',
    connection: 'carto_dw',
    source:
      'SELECT * FROM `carto-dw-ac-4v8fnfsh.shared.lacro_marzo_phase_1_clusters_v2` WHERE aggregated_count > 100',
    format: 'geojson',
  },
  2: {
    type: 'query',
    connection: 'carto_dw',
    source:
      'SELECT * FROM `carto-dw-ac-4v8fnfsh.shared.lacro_marzo_phase_1_clusters_v2`',
    format: 'geojson',
  },
};

function SurveySitesLayer() {
  //@ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const setDetails = useContext(MapContext).setDetails;
  const [data, setData] = useState(null);
  const fetchdata = async (phase: number) => {
    const phaseData = phaseDataSelector(phase, sitePhases);
    const result = await fetchLayerData(phaseData);

    const { zoom, latitude, longitude } = getViewport({
      // @ts-ignore
      geojson: result.data,
      padding: 50,
      width: 300,
      height: 500,
    });

    setDetails((prev) => ({
      ...prev,
      viewState: {
        // @ts-ignore
        ...prev.viewState,
        zoom,
        latitude,
        longitude,
      },
    }));
    setData(result.data);
  };

  useEffect(() => {
    if (phase) {
      fetchdata(phase);
    }
  }, [phase]);

  if (data && phase) {
    return new GeoJsonLayer({
      id: 'survey_site',
      data,
      pointType: 'circle',
      stroked: false,
      pointRadiusScale: 100,
      pointRadiusUnits: 'meters',
      // @ts-ignore
      getPointRadius: (d) => d.properties.aggregated_count,
      getFillColor: [51, 218, 255, 200],
    });
  }
}
