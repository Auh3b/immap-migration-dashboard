import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
// import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
//@ts-ignore
import { ArcLayer } from '@deck.gl/layers';
//@ts-ignore
import { CompositeLayer } from 'deck.gl';
//@ts-ignore
import { RootState } from 'store/store';
// import { LEGEND_TYPES } from '@carto/react-ui';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import getTileFeatures from 'utils/methods/getTileFeatures';
//@ts-ignore
import { TILE_FORMATS } from '@deck.gl/carto';
import { format, scaleLinear } from 'd3';
import distance from '@turf/distance';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import d3Hex2RGB from 'utils/d3Hex2RGB';

const layerStyle = new Map([
  ['País de nacimiento', d3Hex2RGB(1)],
  ['País donde inició el flujo migratorio', d3Hex2RGB(4)],
  ['País donde vivía hace un año', d3Hex2RGB(7)],
]);

type coordinates = [number, number];

const tripLength = (a: [number, number], b: [number, number]): number =>
  distance(a, b, { units: 'kilometers' });

const heightScale = scaleLinear().range([0.75, 0]).domain([0, 40075]);

const getHeight = (a: coordinates, b: coordinates) => {
  const distance = tripLength(a, b);
  const distanceScaled = heightScale(distance);
  return +format('.2f')(distanceScaled);
};

export const MIGRATION_FLOW_LAYER_ID = 'migrationFlowLayer';

//@ts-ignore
class TravelLayer extends CompositeLayer {
  constructor(props: any) {
    super(props);
  }

  initializeState() {
    //@ts-ignore
    this.props.onDataLoads();
  }

  //@ts-ignore
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const {
      data,
      getSourcePosition,
      getTargetPosition,
      getWidth,
      getHeight,
      getTilt,
      pickable,
      visible,
      //@ts-ignore
    } = this.props;
    const layerName = Array.from(layerStyle.keys());
    const layerColor = Array.from(layerStyle.values());
    return [
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[0],
          data,
          getSourcePosition,
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: visible(layerName[0]),
          getSourceColor: layerColor[0],
          getTargetColor: layerColor[0],
          pickable,
        }),
      ),
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[1],
          data,
          getSourcePosition: (d: any) => [+d['long_paisi'], d['lat_paisin']],
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: visible(layerName[1]),
          getSourceColor: layerColor[1],
          getTargetColor: layerColor[1],
          pickable,
        }),
      ),
      new ArcLayer(
        //@ts-ignore
        this.getSubLayerProps({
          id: layerName[2],
          data,
          getSourcePosition: (d: any) => [+d['long_paisv'], d['lat_paisvi']],
          getTargetPosition,
          getWidth,
          getHeight,
          getTilt,
          visible: visible(layerName[2]),
          getSourceColor: layerColor[2],
          getTargetColor: layerColor[2],
          pickable,
        }),
      ),
    ];
  }
}



const filterCoordinates = (d: any) => {
  return (
    +d['long_paisn'] !== 999999 &&
    +d['lat_paisna'] !== 999999 &&
    +d['lon_eng'] !== 999999 &&
    +d['lat_eng'] !== 999999 &&
    +d['long_paisv'] !== 999999 &&
    +d['long_paisv'] !== 999999 &&
    +d['long_paisi'] !== 999999 &&
    +d['lat_paisvi'] !== 999999
  );
};

const getArcHeight = (d: any) => {
  return {
    ...d,
    arcHeight:
      getHeight(
        [+d['long_paisn'], +d['lat_paisna']],
        [d['lon_eng'], d['lat_eng']],
      ) || 0.5,
  };
};

export default function MigrationFlowLayer() {
  const { viewport } = useSelector((state: RootState) => state.carto);
  const [disabledLayers, setDisabledLayers] = useState([])
  const dispatch = useDispatch();
  const { hotspotsLayer, migrationFlowLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, migrationFlowLayer?.source),
  );

  const layerConfig = useMemo(() =>({
    title: 'Flujo de migración',
    visible: true,
    switchable: true,
    legend: {
      children: <CustomLayerLegend legendItems={Array.from(layerStyle)} disableLayers={setDisabledLayers}/>
    },
  }), [])

  async function fetchData() {
    const data = await getTileFeatures({
      sourceId: source.id,
      params: {
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON,
        limit: null,
        filters: source.filters,
        filtersLogicalOperator: source.filtersLogicalOperator,
      },
    });
    return data.filter(filterCoordinates).map(getArcHeight);
  }

  const cartoLayerProps = useCartoLayerProps({
    source,
    layerConfig: migrationFlowLayer,
  });
  delete cartoLayerProps.onDataLoad;

  if (hotspotsLayer && migrationFlowLayer && source) {
    return new TravelLayer({
      ...cartoLayerProps,
      data: fetchData(),
      id: MIGRATION_FLOW_LAYER_ID,
      getSourcePosition: (d: any) => [+d['long_paisn'], d['lat_paisna']],
      getTargetPosition: (d: any) => [d['lon_eng'], d['lat_eng']],
      getWidth: 1,
      getHeight: 1,
      getTilt: 0,
      visible: (name:string)=> !disabledLayers.includes(name),
      pickable: true,
      onDataLoads: () => {
        dispatch(
          updateLayer({
            id: MIGRATION_FLOW_LAYER_ID,
            layerAttributes: { ...layerConfig },
          }),
        );
      },
    });
  }
}

const useStyle = makeStyles(()=>({
  legendIcon:{
    width: '10px',
    height: '10px',
    borderRadius: '100%',
  }
}))


function CustomLayerLegend({legendItems, disableLayers}: {legendItems: any[][], disableLayers: any}){
  return(
    <Grid direction='column' container>
      {legendItems.length > 0 && legendItems.map(([name, color]) => <CustomLegendItem disableLayer={disableLayers} key={name} name={name} color={color} />)}
    </Grid>
  )
}

function CustomLegendItem({color, name, disableLayer}:any){
  const [isOpen, setIsOpen] = useState(false)
  const classes = useStyle()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
    if(isOpen){
      disableLayer((prev:string[]) => prev.filter((d:any) => d !== name))
    }else{
      disableLayer((prev:string[]) => [...prev, name])
    }
  }
  
  return (
    <Grid item container alignItems='center' justifyContent='space-between'>
      <Grid xs={11} container item alignItems='center' style={{gap: '5px'}}>
        <span className={classes.legendIcon} style={{backgroundColor: `rgb(${color[0]},${color[1]}, ${color[2]})`}}></span>
        <Typography variant='overline'>{name}</Typography>
      </Grid>
      <Grid xs={1} item>
        <IconButton onClick={handleToggle}>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Grid>
    </Grid>
  )
}