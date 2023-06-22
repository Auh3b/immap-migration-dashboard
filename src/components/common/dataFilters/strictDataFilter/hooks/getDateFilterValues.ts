import { _FilterTypes } from '@carto/react-core';
import { RootState } from 'store/store';
import { FilterTypes } from 'utils/filterFunctions';
import { StateSlices } from 'utils/types';

interface UseDateFilterValuesProps {
  state: Partial<RootState>;
  slice: StateSlices;
  source: string;
  column?: string;
  id: string;
  type?: _FilterTypes | FilterTypes;
}

export default function getDateFilterValues(
  props: UseDateFilterValuesProps,
): any[] {
  const { slice } = props;
  return slice === StateSlices.CARTO
    ? handleCartoFilters(props)
    : handleOtherFilters(props);
}

function handleCartoFilters(props: UseDateFilterValuesProps): any[] {
  const { state, source, type, column } = props;
  if (!state.carto.dataSources) return [];
  if (!state.carto.dataSources[source]) return [];
  if (!state.carto.dataSources[source].filters) return [];
  if (!state.carto.dataSources[source].filters[column]) return [];
  if (!state.carto.dataSources[source].filters[column]) return [];
  if (!state.carto.dataSources[source].filters[column][type]) return [];
  return state.carto.dataSources[source].filters[column][type].values;
}

function handleOtherFilters(props: UseDateFilterValuesProps): any[] {
  const { state, source, slice, id } = props;
  if (!state[slice].filters) return [];
  if (!state[slice].filters[source]) return [];
  if (!state[slice].filters[source][id]) return [];
  return state[slice].filters[source][id].values;
}
