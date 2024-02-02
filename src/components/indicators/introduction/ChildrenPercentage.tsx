import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { useMemo } from 'react';
import { SummarisationTypes } from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { format } from 'd3';
import { Grid } from '@material-ui/core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const id = 'nna_porcentaje';
const title = 'PORCENTAJE DE NIÑOS, NIÑAS Y ADOLESCENTES EN GRUPOS DE VIAJE';
const column = '';
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const source = 'aurora';
const columns = [
  {
    name: 'e19_cu',
    type: SummarisationTypes.SUM,
  },
  {
    name: 'e17__cua',
    type: SummarisationTypes.SUM,
  },
];
const methodParams = {
  columns,
};

export default function ChildrenPercentage() {
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
        data={data}
        formatter={(value: number) => format('.2%')(value)}
        icon={<Children style={iconStyles} />}
      />
    </Grid>
  );
}
