import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Disabled } from 'assets/img/disabled-2.svg';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
const title = 'Personas con condición de discapacidad';
const subtitle = 'Reportadas en Aurora Chatbot';
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
      try {
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
      } catch (error) {
        return 0;
      }
    }
    return 0;
  }, [_data]);
  return (
    <AggregateIndicatorWidget
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      data={data}
      icon={<Disabled style={iconStyles} />}
    />
  );
}
