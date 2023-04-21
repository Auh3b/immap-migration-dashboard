import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Disabled } from 'assets/img/People-with-physical-impairments.svg';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
const title = 'Personas con condición de discapacidad';
const columns = ['m03__dent'];

export default function TotalDisabled({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const groupValue = groupValuesByColumn({
        data: _data,
        keysColumn: columns[0],
        operation: AggregationTypes.COUNT,
        valuesColumns: columns,
      });
      const yesValues =
      groupValue[
          //@ts-ignore
          groupValue.findIndex((d) => d?.name.toLocaleLowerCase() === 'si')
        ];
      return yesValues.value;
    }
    return 0;
  }, [_data]);
  return (
    <AggregateIndicatorWidget
      title={title}
      isLoading={isLoading}
      data={data}
      icon={<Disabled style={iconStyles} />}
    />
  );
}
