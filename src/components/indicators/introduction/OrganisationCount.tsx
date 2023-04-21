import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Organisation } from 'assets/img/first-aid.svg';
import { useMemo } from 'react';
import aggregateColumns from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { AggregationTypes } from '@carto/react-core';
const title = 'Servicios caracterizados';
const columns = ['org_pert'];

export default function OrganisationCount({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      return aggregateColumns(_data, columns, AggregationTypes.COUNT);
    }
    return 0;
  }, [_data]);
  return (
    <AggregateIndicatorWidget
      title={title}
      isLoading={isLoading}
      data={data}
      icon={<Organisation style={iconStyles} />}
    />
  );
}
