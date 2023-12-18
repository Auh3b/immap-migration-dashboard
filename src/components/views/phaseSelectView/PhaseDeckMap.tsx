import {
  ChangeEvent,
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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  makeStyles,
} from '@material-ui/core';
import getViewport from 'components/indicators/premise/utils/getViewport';
//@ts-ignore
import { FlyToInterpolator } from '@deck.gl/core';
import { useSelector } from 'react-redux';
import { extent, scaleLinear } from 'd3';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';
import { dequal } from 'dequal';
import AnimatedCircleLayer from './utils/AnimatedCircleLayer';
import PolygonWithLabels from './utils/PolygonWithLabels';

const INITIAL_VIEW_STATE = {
  latitude: 8.62581290990417,
  longitude: -81.39079408436801,
  zoom: 2,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
  dragRotate: false,
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
    >
      <SourceSelect />
    </DeckGL>
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
    source: `
    With __q1 as (
      Select * FROM \`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023\`
    ),
    __q2 as (
      SELECT
      ST_CENTROID_AGG(geom) AS geom,
      COUNT(*) AS aggregated_count,
      country_name
    FROM
      __q1
    GROUP BY
      country_name
    )

    SELECT * FROM __q2
    `,
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
  {
    type: 'query',
    connection: 'carto_dw',
    source: `
    With __q1 as (
      Select * FROM \`carto-dw-ac-4v8fnfsh.shared.aurora_round_2\`
    ),
    __q2 as (
      SELECT
      ST_CENTROID_AGG(geom) AS geom,
      COUNT(*) AS aggregated_count,
      country_name
    FROM
      __q1
    GROUP BY
      country_name
    )

    SELECT * FROM __q2
    `,
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
];

const scalePoints = (data: Record<string, unknown>) => {
  const range = [5, 20];
  // @ts-ignore
  const domain = data.features.map((d) => d.properties.aggregated_count);
  // @ts-ignore
  const scale = scaleLinear().domain(extent(domain)).range(range);
  return (count: number) => {
    const scaledPoint = scale(count);
    return scaledPoint;
  };
};

function SurveySitesLayer() {
  const { viewState } = useContext(MapContext).details;
  //@ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const [source, setSources] = useState<any[] | null>(sitePhases);
  const [endPoint, setEndPoint] = useState(1);
  const setDetails = useContext(MapContext).setDetails;
  const [dataLayers, setDataLayers] = useState<null | []>(null);

  const data = useMemo(() => {
    if (dataLayers && phase) {
      return dataLayers[phase - 1];
    }
    return null;
  }, [dataLayers, phase]);

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
    Promise.all(source.map((d) => fetchLayerData(d))).then((results) =>
      // @ts-ignore
      setDataLayers(results.map((d) => d.data)),
    );
  };

  useEffect(() => {
    fetchdata();
    return () => {
      setSources(null);
      setDataLayers(null);
    };
  }, [source]);

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
      viewState,
      color: [255, 87, 51],
    });
  }
}

function SourceSelect() {
  const [value, setvalue] = useState('aurora');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
  };
  return (
    <Paper
      variant={'outlined'}
      style={{ padding: 16, position: 'absolute', top: 8, left: 8 }}
    >
      <FormControl>
        <FormLabel>Source</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value={'aurora'}
            control={<Radio />}
            label={'Aurora'}
          />
          <FormControlLabel
            value={'servicio'}
            control={<Radio />}
            label={'Servicio'}
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
