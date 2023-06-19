import { MouseEvent, useState } from 'react';
import CustomTab from './utils/CustomTab';
import useIntroData from 'components/indicators/introduction/hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { FilterTypes } from 'utils/filterFunctions';

const source = 'aurora';
const id = 'fecha_filtro';
const column = 'timeunix';
const type = FilterTypes.BETWEEN;
const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

export default function StrictDateFilter() {
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
      {Object.keys(data).length && !isLoading ? (
        <CustomTab
          id={id}
          column={column}
          source={source}
          type={type}
          values={data}
          size={'medium'}
          exclusive
          selected={selected}
          onSelectionChange={onSelectionChange}
        />
      ) : null}
    </>
  );
}
