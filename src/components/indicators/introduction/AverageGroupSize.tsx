import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import aggregateColumns, {
  SummarisationTypes,
} from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { Grid } from '@material-ui/core';
import { format } from 'd3';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Tamaño promedio de los grupos de viaje';
const id = 'avgGroupSize';
const column = '';
const source = 'aurora';
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const methodParams = {
  columns: [
    { name: 'e17__cua', type: SummarisationTypes.SUM },
    { name: 'objectid', type: SummarisationTypes.COUNT },
  ],
};

export default function AverageGroupSize() {
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });

  const data = useMemo(() => {
    if (_data.length) {
      return _data[0].value / _data[1].value;
    }
    return 0;
  }, [_data]);

  return (
    <Grid item lg={3}>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        formatter={(value: number) => format('.3')(value)}
        data={data}
        icon={<People style={iconStyles} />}
      />
    </Grid>
  );
}
