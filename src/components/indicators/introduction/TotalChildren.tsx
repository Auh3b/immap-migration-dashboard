import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
const title = 'NNA reportados en los grupos de viaje';
const subtitle = 'Validadas';
const columns = ['e19_1__cu'];

export default function TotalChildren({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      return aggregateColumns(_data, columns) || 0;
    }
    return 0;
  }, [_data]);
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
