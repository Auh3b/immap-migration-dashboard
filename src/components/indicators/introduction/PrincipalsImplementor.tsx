import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import TitleWrapper from '../../common/TitleWrapper';

const title = 'Socios implementadores/Principales';
const columns = [['org_pert1'], ['org_pert2']];
const subtitle = '';
export default function PrincipalsImplementor({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const principles = aggregateColumns(
        _data,
        columns[0],
        AggregationTypes.COUNT,
      );
      const implementors = aggregateColumns(
        _data,
        columns[1],
        AggregationTypes.COUNT,
      );
      return [
        {
          name: 'Principales',
          value: principles,
        },
        {
          name: 'Implementadores',
          value: implementors,
        },
      ];
    }
  }, [_data]);
  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <CategoryWidgetUI data={data} />
      </Grid>
    </TitleWrapper>
  );
}
