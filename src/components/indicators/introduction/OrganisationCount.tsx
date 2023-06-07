import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Organisation } from 'assets/img/first-aid.svg';
import { SummarisationTypes } from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import { useMemo } from 'react';

const id = 'organización_count';
const title = 'PUNTOS DE SERVICIOS CARACTERIZADOS';
const column = '';
const columns = [{ name: 'org_pert', type: SummarisationTypes.COUNT }];
const source = 'premise';
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const methodParams = {
  columns,
};

export default function OrganisationCount() {
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });

  const data = useMemo(() => (_data.length ? _data[0]?.value : 0), [_data]);

  return (
    <AggregateIndicatorWidget
      title={title}
      isLoading={isLoading}
      data={data}
      icon={<Organisation style={iconStyles} />}
    />
  );
}
