import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
import { format } from 'd3';
import { Grid } from '@material-ui/core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const id = 'childrenPercentage'
const title = 'Porcentaje NNA en grupos de viaje';
const column = ''
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS
const source = 'aurora'
const columns: [string[], AggregationTypes] = [
  ['e20__cua', 'e21__cua', 'e22__cua'],
  AggregationTypes.SUM,
];
const divider: [string, AggregationTypes] = ['e17__cua', AggregationTypes.SUM];
const methodParams = {
  columns,
  divider
}

export default function ChildrenPercentage() {

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
        data={data[0] || 0}
        formatter={(value: number) => format('.2%')(value)}
        icon={<Children style={iconStyles} />}
      />
    </Grid>
  );
}
