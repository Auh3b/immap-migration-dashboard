import { StateSlices } from 'utils/types';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import StrictDateFilter from 'components/common/dataFilters/strictDataFilter/Index';
import { FilterTypes } from 'utils/filterFunctions';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';

const id = 'fecha_filtro';
const column = 'timeunix';
const source = SOURCE_NAMES.TIMELINE_SOURCE;
const type = FilterTypes.BETWEEN;
const methodName = EXTERNAL_METHOD_NAMES.GET_TEMPORAL_FILTER_VALUES;

export default function DinamicaStrictDateFilter() {
  const { data, isLoading } = useWidgetFetch({
    id,
    column,
    dataSource: source,
    methodName,
  });
  return (
    <StrictDateFilter
      id={id}
      column={column}
      isLoading={isLoading}
      source={source}
      type={type}
      // @ts-ignore
      data={data}
      stateSlice={StateSlices.CARTO}
    />
  );
}
