import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
import { format } from 'd3';

const title = 'Porcentaje NNA en grupos de viaje';

const columns: [string[], AggregationTypes] = [
  ['e20__cua', 'e21__cua', 'e22__cua'],
  AggregationTypes.SUM,
];
const divider: [string, AggregationTypes] = ['e17__cua', AggregationTypes.SUM];

export default function ChildrenPercentage({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean; 
}) {
  const data = useMemo(() => {
    if (_data) {
      const dividerValue =
        aggregateColumns(_data, [divider[0]]) +
        aggregateColumns(_data, ['objectid'], AggregationTypes.COUNT);
      const totalValue = aggregateColumns(_data, [...columns[0]]);
      return totalValue / dividerValue;
    }

    return 0;
  }, [_data]);
  return (
    <AggregateIndicatorWidget
      title={title}
      isLoading={isLoading}
      data={data}
      formatter={(value:number)=> format('.2%')(value)}
      icon={<Children style={iconStyles} />}
    />
  );
}
