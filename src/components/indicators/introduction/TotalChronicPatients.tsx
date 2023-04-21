import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as SickPeople } from 'assets/img/fever.svg';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
const title = 'Personas con enfermedades crónicas';
const columns = ['m02__en_t'];

export default function TotalChronicPatients({
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
      icon={<SickPeople style={iconStyles} />}
    />
  );
}
