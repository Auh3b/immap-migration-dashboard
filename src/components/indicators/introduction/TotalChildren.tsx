import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Children } from 'assets/img/children.svg';
import { Fragment, useMemo } from 'react';
import iconStyles from './utils/iconStyles';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import { SummarisationTypes } from '../utils/AggregateColumns';
import { useSelector } from 'react-redux';

const id = 'totalChildren';
const column = '';
const source = 'aurora';
const title = 'NNA reportados en los grupos de viaje';
const subtitle = 'Validadas';
const columns = [{ name: 'e19_cu', type: SummarisationTypes.SUM }];
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const methodParams = {
  columns,
};

export default function TotalChildren() {
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });

  const data = useMemo(() => (_data.length ? _data[0]?.value : 0), [_data]);

  return (
    <Fragment>
      {phase !== 2 && (
        <AggregateIndicatorWidget
          title={title}
          subtitle={subtitle}
          isLoading={isLoading}
          data={data}
          icon={<Children style={iconStyles} />}
        />
      )}
    </Fragment>
  );
}
