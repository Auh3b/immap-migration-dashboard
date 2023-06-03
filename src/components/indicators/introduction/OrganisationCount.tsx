import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Organisation } from 'assets/img/first-aid.svg';
import aggregateColumns from '../utils/AggregateColumns';
import iconStyles from './utils/iconStyles';
import { AggregationTypes } from '@carto/react-core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const id = 'organisationCount'
const title = 'PUNTOS DE SERVICIOS CARACTERIZADOS';
const column = ''
const columns = ['org_pert'];
const source = 'premise'
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS
const methodParams = {
  columns
}

export default function OrganisationCount() {
  
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
      isLoading={isLoading}
      data={data}
      icon={<Organisation style={iconStyles} />}
    />
  );
}
