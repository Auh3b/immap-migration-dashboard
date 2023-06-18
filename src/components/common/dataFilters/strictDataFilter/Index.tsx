import { MouseEvent, useMemo, useState } from 'react';
import CustomTab from './utils/CustomTab';
import useIntroData from 'components/indicators/introduction/hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const id = 'filtro fecha';
const source = 'aurora';
const column = 'timeunix';
const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

export default function StrictDateFilter() {
  const values = ['APR', 'MAR'];
  const [selected, setSelected] = useState<string | null>(null);
  const onSelectionChange = (
    event: MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    setSelected(newValue);
  };

  const { data, isLoading } = useIntroData({
    id,
    source,
    column,
    methodName,
  });

  return (
    <>
      {data && (
        <CustomTab
          values={Object.keys(data)}
          exclusive
          selected={selected}
          onSelectionChange={onSelectionChange}
          children={selected ? data[selected].children : null}
        />
      )}
    </>
  );
}
