import { Grid, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ActiveFilterItem, { ActiveFilterItemProps } from './ActiveFilterItem';
import { FilterSource } from './Index';
import { removeFilter } from '@carto/react-redux';
import { removeMediaFilter } from 'store/mediaSlice';
import { removeIntroFilter } from 'store/introSlice';

interface ActiveFiltersProps {
  filterSources: FilterSource[];
}
type SourceProps = Record<string, Partial<ActiveFilterItemProps>>;

interface FilterGroupProps {
  name: string;
  filters: [string, Partial<ActiveFilterItemProps>][];
  valueFormatter?: Function;
  removeFunction: Function;
}

const removeFunction = Object.fromEntries([
  ['carto', removeFilter],
  ['media', removeMediaFilter],
  ['intro', removeIntroFilter],
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
            for (let [type, { valueFormatter = {}, values, owner }] of types) {
              const newActiveFilter = [column, { values, owner, type, source }];
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

    console.log(output);

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
      <Typography variant='subtitle1' style={{ textTransform: 'uppercase' }}>
        {name}
      </Typography>
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
