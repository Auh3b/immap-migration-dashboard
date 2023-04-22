import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import iconStyles from './utils/iconStyles';

const title = 'Personas en los grupos de viaje';
const subtitle = 'Validadas';
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
        (aggregateColumns(_data, columns[0]) || 0) +
        (aggregateColumns(_data, columns[1], AggregationTypes.COUNT) || 0)
      );
    }
    return 0;
  }, [_data]);
  return (
    <AggregateIndicatorWidget
      title={title}
      isLoading={isLoading}
      data={data}
      subtitle={subtitle}
      icon={<People style={iconStyles} />}
    />
  );
}
