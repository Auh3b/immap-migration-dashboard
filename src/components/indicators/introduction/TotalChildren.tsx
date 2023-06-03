import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const id = 'totalChildren'
const column = ''
const source = 'aurora'
const title = 'NNA reportados en los grupos de viaje'; 
const subtitle = 'Validadas';
const columns = ['e19_1__cu'];
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS
const methodParams = {
  columns
}

export default function TotalChildren() {

  const { data, isLoading} = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams
  })

  return (
    <AggregateIndicatorWidget
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      data={data}
      icon={<Children style={iconStyles} />}
    />
  );
}
