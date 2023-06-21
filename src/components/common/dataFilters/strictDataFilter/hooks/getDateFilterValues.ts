import { _FilterTypes } from '@carto/react-core';
import { RootState } from 'store/store';
import { FilterTypes } from 'utils/filterFunctions';
import { StateSlices } from 'utils/types';

interface UseDateFilterValuesProps {
  state: Partial<RootState>;
  slice: StateSlices;
  source: string;
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
  const { state, source, type, id } = props;
  if (!state.carto.dataSources) return [];
  if (!state.carto.dataSources[id]) return [];
  if (!state.carto.dataSources[source].filters) return [];
  if (!state.carto.dataSources[source].filters[id]) return [];
  if (!state.carto.dataSources[source].filters[id][type]) return [];
  return state.carto.dataSources[source].filters[id][type].values;
}

function handleOtherFilters(props: UseDateFilterValuesProps): any[] {
  const { state, source, slice, id } = props;
  if (!state[slice].filters) return [];
  if (!state[slice].filters[source]) return [];
  if (!state[slice].filters[source][id]) return [];
  return state[slice].filters[source][id].values;
}
