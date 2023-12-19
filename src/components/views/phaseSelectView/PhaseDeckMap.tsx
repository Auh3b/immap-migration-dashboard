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
import auroraPhases from './data/auroraPhaseSources';
import servicePhases from './data/servicePhaseSources';
import { SERVICES_KEY } from 'components/indicators/premise/utils/premiseServiceDefinitions';

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

function getTooltip(dimension) {
  if (!dimension) return () => null;
  const textFn = dimension === 'aurora' ? getAuroraText : getServicioText;
  return ({ object }) => {
    console.log(object);
    const text = object ? textFn(object?.properties) : null;
    console.log(text);
    return (
      text && {
        html: `<div>${text}</div>`,
        style: {
          maxWidth: '300px',
          backgoundColor: 'rgba(0,0,0,0.5)',
          padding: '4px',
        },
      }
    );
  };
}

function getAuroraText(value: any) {
  return `Pais: ${value.country_name} <Br> Migrantes: ${value.aggregated_count} `;
}

function getServicioText(value: any) {
  const services = Array.from(
    new Set((value.services as string).split('|')),
  ).map((d) => `<li>${SERVICES_KEY.get(+d)}</li>`);
  return `<ul> ${services.join('')}</>`;
}

function DeckMapContainer() {
  const {
    details: { viewState, source },
    setDetails,
  } = useContext(MapContext);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetails((prev) => ({ ...prev, source: value }));
  };
  useEffect(() => {
    if (!source) {
      setDetails((prev) => ({ ...prev, source: 'aurora' }));
    }
  }, []);
  return (
    // @ts-ignore
    <DeckGL
      initialViewState={{
        // @ts-ignore
        ...viewState,
        transitionDuration: 500,
        transitionInterpolator,
      }}
      getTooltip={getTooltip(source)}
      controller
      layers={[SurveySitesLayer(), CountriesLayer()]}
    >
      <SourceSelect value={source} handleChange={handleChange} />
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

const getFillColor = (value) => {
  if (!value) return [255, 87, 51];
  return value === 'aurora' ? [255, 87, 51] : [28, 171, 226];
};

function SurveySitesLayer() {
  const { viewState, source: dimension } = useContext(MapContext).details;
  //@ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const [source, setSources] = useState<any[] | null>(auroraPhases);
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

  useEffect(() => {
    if (!dimension) {
      setSources(auroraPhases);
    }
    if (dimension === 'aurora') {
      setSources(auroraPhases);
    }
    if (dimension === 'servicio') {
      setSources(servicePhases);
    }
  }, [dimension]);

  const fetchdata = (dataSources) => {
    Promise.all(dataSources.map((d) => fetchLayerData(d))).then((results) =>
      // @ts-ignore
      setDataLayers(results.map((d) => d.data)),
    );
  };

  useEffect(() => {
    fetchdata(source);
    return () => {
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
      getText: dimension === 'aurora' ? getAuroraText : getServicioText,
      color: getFillColor(dimension),
    });
  }
}

function SourceSelect(props: {
  value: string | unknown;
  handleChange: (e) => void;
}) {
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const { value, handleChange } = props;
  return (
    <>
      {Boolean(phase) && (
        <Paper
          variant={'outlined'}
          style={{
            padding: '8px 16px',
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          <FormControl>
            <RadioGroup value={value || 'aurora'} onChange={handleChange}>
              <FormControlLabel
                value={'aurora'}
                control={<Radio />}
                label={'Concentraciones de migrantes'}
              />
              <FormControlLabel
                value={'servicio'}
                control={<Radio />}
                label={'Ubicaciones de servicio'}
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      )}
    </>
  );
}
