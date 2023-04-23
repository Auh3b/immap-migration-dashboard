import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Pregnant } from 'assets/img/pregnant-1.svg';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
const title = 'Mujeres gestantes en los grupos';
const subtitle = 'Reportadas en Aurora Chatbot';
const columns = ['m01__en_t'];

export default function TotalPregnant({
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
      subtitle={subtitle}
      isLoading={isLoading}
      data={data}
      icon={<Pregnant style={iconStyles} />}
    />
  );
}
