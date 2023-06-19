import { MouseEvent, useCallback, useEffect, useState } from 'react';
import CustomTab from './utils/CustomTab';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { FilterTypes } from 'utils/filterFunctions';
import { useDispatch, useSelector } from 'react-redux';
import executeIntroMethod from 'components/indicators/introduction/utils/executeIntroMethod';
import { addIntroFilter } from 'store/introSlice';
import { removeIntroFilter } from 'store/introSlice';

const source = 'aurora';
const id = 'fecha_filtro';
const column = 'timeunix';
const type = FilterTypes.BETWEEN;
const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

export default function StrictDateFilter() {
  const dispatch = useDispatch();
  //@ts-ignore
  const isIntroDataReady = useSelector((state) => state.intro.isIntroDataReady);
  const [data, setData] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const onSelectionChange = useCallback(
    (event: MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue) {
        setSelected(newValue);
        //@ts-ignore
        const selectedData = data[newValue];
        const values = [selectedData.start, selectedData.end];
        dispatch(
          addIntroFilter({
            owner: id,
            column,
            source,
            type,
            values: [values],
          }),
        );
      } else {
        setSelected(null);
        dispatch(
          removeIntroFilter({
            owner: id,
            column,
            source,
          }),
        );
      }
    },
    [data, isIntroDataReady, dispatch, selected],
  );

  useEffect(() => {
    if (isIntroDataReady) {
      executeIntroMethod({
        source,
        methodName,
        column,
      })
        .then((data) => setData(data))
        .finally(() => setIsLoading(false));
    }
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [isIntroDataReady]);

  return (
    <>
      {data && !isLoading ? (
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
