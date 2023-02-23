import { makeStyles } from '@material-ui/core/styles';
import { /*Divider,*/ Grid /*,Typography*/ } from '@material-ui/core';
// import MediaContainer from 'components/common/media/MediaContainer';
// import { FormulaWidget } from '@carto/react-widgets';
// import hotspotSource from 'data/sources/hotspotSource';
// import { AggregationTypes } from '@carto/react-core';
// import { PieWidgetUI } from '@carto/react-ui';
// import MainView from './main/MainView';
//@ts-ignore
import { Deck } from '@deck.gl/core'
import Map from 'components/common/map/Map'
//@ts-ignore
import { fetchMap } from '@deck.gl/carto'
//@ts-ignore
import DeckGL from '@deck.gl/react'
import { useEffect, useState } from 'react';
import DeckGLComponent from 'components/common/map/DeckGLComponent';

// const colors = ['#1877f2', '#075e54', '#1da1f2', '#9146ff'];

// const data = [
//   {
//     name: 'Facebook',
//     value: Math.floor(5050 * 0.45),
//   },
//   {
//     name: 'WhatsApp',
//     value: Math.floor(5050 * 0.25),
//   },
//   {
//     name: 'Twitter',
//     value: Math.floor(5050 * 0.2),
//   },
//   {
//     name: 'Others',
//     value: Math.floor(5050 * 0.1),
//   },
// ];

// const useStyles = makeStyles(() => ({
//   media: {},
//   title: {
//     padding: 5,
//   },
//   content: {
//     marginBottom: 10,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    // },

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
}));

const cartoMapId = '9ddf6a22-3bdf-4b41-9d6a-80ea80895d32'


export default function Media() {
  const classes = useStyles();
  const [layers, setLayers] = useState([])

  useEffect(() => {
    async function fetchMapLayers() {
      const {layers} = await fetchMap({cartoMapId})
      // const l = layers.splice(2,2)
      console.log(layers)
      setLayers(layers)
    }

    fetchMapLayers()
  
    return () => {
      setLayers([])
    }
  }, [])
  
  // [hygen] Add useEffect

  return (
    <Grid item className={classes.mapWrapper}>
      <DeckGLComponent layers={layers}/>
    </Grid>
    
    // <MainView>
    //   {{
    //     left: (
    //       <>
    //         <Grid item className={classes.content}>
    //           <FormulaWidget
    //             id='participantCount'
    //             title='Participación por red social'
    //             dataSource={hotspotSource.id}
    //             column='carto_10_e'
    //             operation={AggregationTypes.SUM}
    //           />
    //         </Grid>
    //         <Divider />
    //         <Grid item className={classes.content}>
    //           <Typography variant='h6' className={classes.title}>
    //             Participación por red social
    //           </Typography>
    //           <PieWidgetUI data={data} color={colors} />
    //         </Grid>
    //         <Divider />
    //         <Grid item className={classes.content}>
    //           <MediaContainer />
    //         </Grid>
    //       </>
    //     ),
    //   }}
    // </MainView>
  );
}