import {
  extent,
  geoMercator,
  geoPath,
  pointer,
  scaleLinear,
  select,
  zoom,
  zoomIdentity,
} from 'd3';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import americaFeatureCollection from './americas';
// @ts-ignore
import { fetchLayerData } from '@deck.gl/carto';
import { UNICEF_COLORS } from 'theme';

type Width = number;
type Height = number;
const width: Width = 650;
const height: Height = 500;

const projection = geoMercator().fitSize(
  [width, height],
  // @ts-ignore
  americaFeatureCollection,
);
const path = geoPath(projection);

export default function PhaseMap() {
  const [bounds, setBounds] = useState<number[][] | null>(null);
  return (
    <SVGContainer width={width} heigth={height} bounds={bounds}>
      <PhaseSurveySites setBounds={setBounds} />
      <Countries />
    </SVGContainer>
  );
}

interface SVGContainerProps {
  width: Width;
  heigth: Height;
  bounds?: number[][];
}

function SVGContainer(props: PropsWithChildren<SVGContainerProps>) {
  return (
    <svg width={props.width} height={props.heigth}>
      <MapPanel bounds={props.bounds}>{props.children}</MapPanel>
    </svg>
  );
}

function MapPanel(props: PropsWithChildren<{ bounds?: number[][] }>) {
  const gRef = useRef();
  const [transform, setTransform] = useState<null | {
    k: number;
    x: number;
    y: number;
  }>(null);
  useEffect(() => {
    if (props.bounds) {
      const [[x0, y0], [x1, y1]] = props.bounds;
      const zoomed = zoom().on('zoom', (event) => {
        setTransform(event.transform);
      });
      const svg = select(gRef.current);
      svg
        .transition()
        .duration(1000)
        .call(
          // @ts-ignore
          zoomed.transform,
          zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(
                8,
                0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
              ),
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        );
    }
  }, [gRef, props.bounds]);

  return (
    <g
      ref={gRef}
      transform={
        transform
          ? `translate(${transform.x},${transform.y})scale(${transform.k})`
          : ''
      }
    >
      {props.children}
    </g>
  );
}

function Countries() {
  const countryBoundaries = useMemo(() => {
    return americaFeatureCollection.features.map((d, i) => (
      <path
        key={'country_' + i}
        // @ts-ignore
        d={path(d)}
        fill='none'
        stroke='#333333'
        strokeWidth={0.1}
      />
    ));
  }, []);
  return <g>{countryBoundaries}</g>;
}

interface PhaseSurveySitesProps {
  setBounds: Dispatch<SetStateAction<number[][]>>;
}

const getLinearScale = (domain: number[], range: number[]) =>
  scaleLinear().domain(domain).range(range);

function PhaseSurveySites(props: PhaseSurveySitesProps) {
  const [site, setSite] = useState<null | Record<string, any>>(null);
  useEffect(() => {
    fetchLayerData({
      type: 'query',
      connection: 'carto_dw',
      source:
        'SELECT * FROM `carto-dw-ac-4v8fnfsh.shared.lacro_marzo_phase_1_clusters_v2` WHERE aggregated_count > 100',
      format: 'geojson',
      headers: {
        'cache-control': 'max-age=300',
      },
    }).then((result) => {
      setSite(result.data);
      props.setBounds(path.bounds(result.data));
    });
  }, []);

  const surveySites = useMemo(() => {
    if (!site) return null;
    const domain = extent(
      site.features.map((d) => +d.properties['aggregated_count']),
    );
    // @ts-ignore
    const getScaledRadius = getLinearScale(domain, [1, 5]);
    return site.features.map((d, i) => {
      return (
        <circle
          key={'sites_' + i}
          // @ts-ignore
          cx={projection(d.geometry.coordinates)[0]}
          // @ts-ignore
          cy={projection(d.geometry.coordinates)[1]}
          fill={UNICEF_COLORS[0]}
          opacity={0.3}
          r={getScaledRadius(+d.properties['aggregated_count'])}
        />
      );
    });
  }, [site]);
  return <g>{surveySites}</g>;
}
