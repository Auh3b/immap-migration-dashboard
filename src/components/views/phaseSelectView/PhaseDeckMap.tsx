import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import americaFeatureCollection from './americas';
import { Grid, makeStyles } from '@material-ui/core';
import getViewport from 'components/indicators/premise/utils/getViewport';
//@ts-ignore
import { FlyToInterpolator } from '@deck.gl/core';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { dequal } from 'dequal';
import AnimatedCircleLayer from './utils/AnimatedCircleLayer';
import PolygonWithLabels from './utils/PolygonWithLabels';

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
    ></DeckGL>
  );
}

const targetCountries = ['PAN', 'COL', 'CRI', 'CHL'];

function CountriesLayer() {
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const setDetails = useContext(MapContext).setDetails;
  useEffect(() => {
    const data = {
      ...americaFeatureCollection,
      features: americaFeatureCollection.features.filter(
        ({ properties: { ADM0_A3 } }) => targetCountries.includes(ADM0_A3),
      ),
    };
    const { zoom, latitude, longitude } = getViewport({
      // @ts-ignore
      geojson: data,
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
  }, []);
  const getFillColor = useCallback(
    (d) => {
      if (phase) return [0, 0, 0, 0];
      if (!targetCountries.includes(d.properties.ADM0_A3)) return [0, 0, 0, 0];
      return [51, 218, 255, 200];
    },
    [phase],
  );
  return new PolygonWithLabels({
    data: americaFeatureCollection,
    getFillColor,
    phase,
  });
}

const sitePhases = [
  {
    type: 'query',
    connection: 'carto_dw',
    source:
      'SELECT * FROM `carto-dw-ac-4v8fnfsh.shared.lacro_marzo_phase_1_clusters_v2` WHERE aggregated_count > 100',
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
  {
    type: 'query',
    connection: 'carto_dw',
    source:
      'SELECT * FROM `carto-dw-ac-4v8fnfsh.shared.migration_round_2_clusters`',
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
];

function SurveySitesLayer() {
  //@ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const [endPoint, setEndPoint] = useState(1);
  const setDetails = useContext(MapContext).setDetails;
  const [dataLayers, setDataLayers] = useState<null | []>(null);
  const data = useMemo(() => {
    if (dataLayers && phase) {
      return dataLayers[phase - 1];
    }
    return null;
  }, [dataLayers, phase]);

  const scalePoints = useCallback(
    (count: number) => {
      if (data) {
        const range = [5, 20];
        const domain = data.features.map((d) => d.properties.aggregated_count);
        return scaleLinear().domain(domain).range(range)(count);
      }
    },
    [data],
  );

  useCustomCompareEffectAlt(
    () => {
      if (data) {
        const { zoom, latitude, longitude } = getViewport({
          // @ts-ignore
          geojson: data,
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
      }
    },
    [data],
    dequal,
  );

  const fetchdata = () => {
    Promise.all(sitePhases.map((d) => fetchLayerData(d))).then((results) =>
      // @ts-ignore
      setDataLayers(results.map((d) => d.data)),
    );
  };

  useEffect(() => {
    fetchdata();
    return () => {
      setDataLayers(null);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEndPoint((prev) => (prev ? 0 : 1.75));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (data) {
    return new AnimatedCircleLayer({
      data,
      scalePoints,
      endPoint,
    });
  }
}
