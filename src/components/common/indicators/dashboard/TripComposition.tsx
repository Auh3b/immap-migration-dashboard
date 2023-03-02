import { AggregationTypes } from '@carto/react-core';
import { selectSourceById } from '@carto/react-redux';
// import { executeTask, Methods } from '@carto/react-workers';
// import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
//@ts-ignore
// import { TILE_FORMATS } from '@deck.gl/carto';
// import TopLoading from 'components/common/TopLoading';
import { CategoryWidget } from '@carto/react-widgets';

// const GROUP_CLASSES = new Map([
//   ['Viajo solo', 1],
//   ['Entre 2 y 3 personas', 2],
//   ['Entre 4 y 5 personas', 3],
//   ['Más de 5', 4],
// ]);

export default function TripComposition() {
  // const [data, setData] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const { viewport } = useSelector((state: RootState) => state.carto);
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );

  // useEffect(() => {
  //   const getData =async () => {
  //     setIsLoading(true)
  //     try {
  //       const {data: tileData} = await executeTask(source.id, Methods.FEATURES_RAW, {
  //         viewport,
  //         tileFormat: TILE_FORMATS.GEOJSON,
  //         //@ts-ignore
  //         limit: null
  //       })

  //       //@ts-ignore
  //       const filteredTileData = tileData.filter(f => f.acompanan !== 'null').map(f => ({...f, acc_value: GROUP_CLASSES.get(f.acompanan)})).map(f => f.acc_value)
  //       setData(filteredTileData)
  //       setIsLoading(false)
  //     } catch (error) {
  //       setError(true)
  //     }
  //   }
  //   // console.log(data)
  //   getData()

  //   return () => {
  //     setData([])
  //   }
  // }, [viewport])

  return (
    <CategoryWidget
      id='tripComposition'
      column='acompanan'
      title='acompanan'
      dataSource={source.id}
      operation={AggregationTypes.COUNT}
    />
    // <>
    // {isLoading ? (<TopLoading/>) : error ? (<div> There was a error</div>): !isLoading && data?.length > 0 ?(
    //   <CustomHistogramWidget
    //     dataSource=""
    //     title='acompanan'
    //     id='tripComposition'
    //     column='acompanan'
    //     data={data}
    //     filterType={_FilterTypes.IN}
    //     isLoading={isLoading}
    //   />
    // ) : (<div> No Data</div>)
    // }
    // </>
  );
}
