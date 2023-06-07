import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Disabled } from 'assets/img/disabled-2.svg';
import { useMemo } from 'react';
import iconStyles from './utils/iconStyles';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
const title = 'Personas con condición de discapacidad';
const subtitle = 'Reportadas en Chatbot';
const id = 'totalDisabled';
const column = 'm03__dent';
const source = 'aurora';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function TotalDisabled() {
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
      return yesValues ? yesValues.value : 0;
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
