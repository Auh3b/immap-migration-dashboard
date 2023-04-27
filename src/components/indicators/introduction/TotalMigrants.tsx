import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
import { Grid } from '@material-ui/core';

const title = 'Personas en los grupos de viaje';

const columns = [['e17__cua'], ['objectid']];

export default function TotalMigrants({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      return (
        aggregateColumns(_data, columns[0]) || 0
        // +
        // (aggregateColumns(_data, columns[1], AggregationTypes.COUNT) || 0)
      );
    }
    return 0;
  }, [_data]);

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
