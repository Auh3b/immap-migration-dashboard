import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import aggregateColumns, {
  SummarisationTypes,
} from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
import { Grid } from '@material-ui/core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Personas en los grupos de viaje';
const column = '';
const columns = [{ name: 'e17__cua', type: SummarisationTypes.SUM }];
const id = 'totalMigrants';
const source = 'aurora';
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const methodParams = {
  columns,
};

export default function TotalMigrants() {
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });
  const data = useMemo(() => (_data.length ? _data[0]?.value : 0), [_data]);
  return (
    <Grid item lg={3}>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        data={data}
        icon={<People style={iconStyles} />}
      />
    </Grid>
  );
}
