import {
  ActiveFiltersProps,
  SourceProps,
  FilterGroupProps,
  ActiveFilterItemProps,
} from './sideAnalyticsPanelTypes';
import { Grid, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ActiveFilterItem from './ActiveFilterItem';
import { removeFilter } from '@carto/react-redux';
import { removeMediaFilter } from 'store/mediaSlice';
import { removeIntroFilter } from 'store/introSlice';
import { StateSlices } from 'utils/types';

const removeFunction: Record<StateSlices, Function> = Object.fromEntries([
  [StateSlices.CARTO, removeFilter],
  [StateSlices.MEDIA, removeMediaFilter],
  [StateSlices.INTRO, removeIntroFilter],
]);

export function ActiveFilters({ filterSources }: ActiveFiltersProps) {
  const state = useSelector((state: RootState) => state);

  const filterGroups = useMemo(() => {
    if (!filterSources.length) {
      return [];
    }

    let output: FilterGroupProps[] = [];

    for (let i = 0; i < filterSources.length; i++) {
      const { stateSlice } = filterSources[i];
      if (!state[stateSlice]) {
        continue;
      }
      if (stateSlice === 'carto') {
        const dataSources = Object.entries(state[stateSlice].dataSources);
        //@ts-ignore
        for (let [source, { filters }] of dataSources) {
          const filteredColumns = filters ? Object.entries(filters) : [];

          if (!filteredColumns.length) {
            continue;
          }

          let activeFilters: [string, Partial<ActiveFilterItemProps>][] = [];

          for (let [column, typedValues] of filteredColumns) {
            const types = Object.entries(typedValues);
            for (let [type, filterValues] of types) {
              const { params = {}, values, owner } = filterValues;
              const { valueFormatter = null } = params;
              const newActiveFilter = [
                owner,
                { values, owner, column, type, source, valueFormatter },
              ];
              //@ts-ignore
              activeFilters = [...activeFilters, [...newActiveFilter]];
            }
          }
          output = [
            ...output,
            {
              name: source,
              filters: [...activeFilters],
              removeFunction: removeFunction[stateSlice],
            },
          ];
        }
      } else {
        const dataSources: [string, SourceProps][] = Object.entries(
          state[stateSlice]?.filters,
        );
        for (let [source, filters] of dataSources) {
          output = [
            ...output,
            {
              name: source,
              filters: [...Object.entries(filters)],
              removeFunction: removeFunction[stateSlice],
            },
          ];
        }
      }
    }

    return output;
  }, [state, filterSources]);

  return (
    <Grid container direction='column'>
      {!filterGroups.length
        ? null
        : filterGroups.map(({ name, filters, removeFunction }) => (
            <FilterGroup
              key={name}
              name={name}
              filters={filters}
              removeFunction={removeFunction}
            />
          ))}
    </Grid>
  );
}
function FilterGroup(props: FilterGroupProps) {
  const { name, filters, removeFunction } = props;
  return (
    <Grid item>
      {filters.map(([filterName, filterProps]) => (
        <ActiveFilterItem
          key={filterName}
          name={filterName}
          id={filterName}
          {...filterProps}
          removeFilter={removeFunction}
        />
      ))}
    </Grid>
  );
}
