import { Grid, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ActiveFilterItem, { ActiveFilterItemProps } from '../ActiveFilterItem';
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
  removeFunction: Function;
}

const removeFunction = Object.fromEntries([
  ['carto', removeFilter],
  ['media', removeMediaFilter],
  ['intro', removeIntroFilter],
])

export function ActiveFilters({ filterSources }: ActiveFiltersProps) {
  const state = useSelector((state: RootState) => state);
  const filterGroups = useMemo(() => {
    if (!filterSources.length) { return []; }

    let output: FilterGroupProps[] = [];

    for (let i = 0; i < filterSources.length; i++) {
      const { stateSlice } = filterSources[i];
      if (!state[stateSlice]) { return; }
      if (stateSlice === 'carto') {
        return;
      } else {
        const dataSources: [string, SourceProps][] = Object.entries(state[stateSlice]?.filters);
        console.log(dataSources);
        for (let [source, filters] of dataSources) {

          output = [...output, { name: source, filters: [...Object.entries(filters)], removeFunction: removeFunction[stateSlice] }];
        }
      }
    }

    return output;
  }, [state]);
  return (
    <Grid container direction='column'>
      {!filterGroups.length ? null : filterGroups.map(({ name, filters, removeFunction }) => (
        <FilterGroup key={name} name={name} filters={filters} removeFunction={removeFunction} />
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
        <ActiveFilterItem key={filterName} name={filterName} id={filterName} {...filterProps} removeFilter={removeFunction} />
      ))}
    </Grid>
  );
}
