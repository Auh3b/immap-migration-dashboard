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
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );

  return (
    <CategoryWidget
      id='tripComposition'
      column='acompanan'
      title='acompanan'
      dataSource={source.id}
      operation={AggregationTypes.COUNT}
    />
  );
}
