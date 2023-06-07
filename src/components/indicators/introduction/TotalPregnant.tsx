import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as Pregnant } from 'assets/img/pregnant-1.svg';
import { useMemo } from 'react';
import iconStyles from './utils/iconStyles';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
const title = 'Mujeres gestantes en los grupos';
const subtitle = 'Reportadas en Aurora Chatbot';
const column = 'm01__en_t';
const id = 'totalPregnant';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const source = 'aurora';

export default function TotalPregnant() {
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
      icon={<Pregnant style={iconStyles} />}
    />
  );
}
