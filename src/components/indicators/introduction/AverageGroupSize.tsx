import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { Grid } from '@material-ui/core';
import { format } from 'd3';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Tamaño promedio de los grupos de viaje';
const id  = 'avgGroupSize'
const column = '';
const source = 'aurora'
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS
const methodParams = {
  columns: [['e17__cua'], ['objectid']]
}

export default function AverageGroupSize() {

const { data, isLoading} = useIntroData({
  id,
  column,
  source,
  methodName,
  methodParams
})

  return (
    <Grid item lg={3}>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        formatter={(value: number) => format('.3')(value)}
        data={data[0] || 0}
        icon={<People style={iconStyles} />}
      />
    </Grid>
  );
}
