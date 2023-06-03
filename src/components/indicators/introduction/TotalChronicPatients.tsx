import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as SickPeople } from 'assets/img/fever.svg';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import iconStyles from './utils/iconStyles';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const id = 'totalChronicPatients';
const column = 'm02__en_t';
const source = 'aurora';
const title = 'Personas con enfermedades crónicas';
const subtitle = 'Reportadas en Chatbot';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function TotalChronicPatients() {
  const { data: _data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });
  const data = useMemo(() => {
    if (_data.length) {
      const yesValues =
        _data[
          //@ts-ignore
          _data.findIndex((d) => d?.name.toLocaleLowerCase() === 'si')
        ];
      return yesValues ?  yesValues.value : 0;
    }
    return 0;
  }, [_data]);

  return (
    <AggregateIndicatorWidget
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      data={data}
      icon={<SickPeople style={iconStyles} />}
    />
  );
}
