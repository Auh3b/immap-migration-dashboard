import { Divider, Grid, Typography } from '@material-ui/core';
import ActiveFilterItem, {
  ActiveFilterItemProps,
} from 'components/common/ActiveFilterItem';
import { SICK_CATEGORY_ABREVATIONS } from 'components/indicators/premise/utils/services';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

type Filters = Record<string, Record<string, ActiveFilterItemProps>>;

const valueFormatters: Record<string, Function> = {
  gente_enferma: (value: any) => {
    const newValue = Object.fromEntries(SICK_CATEGORY_ABREVATIONS)[+value];
    return newValue;
  },
};

export default function IntroActiveFilters() {
  // @ts-ignore
  const _filters: Filters = useSelector((state) => state.intro.filters);
  const filters = useMemo(() => {
    let output: any[] = [];
    const sources = Object.entries(_filters);
    for (let [name, _appliedFilters] of sources) {
      let _output: any[] = [];
      const sourceFilters = Object.entries(_appliedFilters);
      if (sourceFilters.length) {
        for (let [filterName, filterPros] of sourceFilters) {
          _output = [
            ..._output,
            [
              filterName,
              {
                ...filterPros,
                valueFormatter: valueFormatters[filterName] || null,
              },
            ],
          ];
        }
        output = [...output, [name, _output]];
      }
    }

    return output;
  }, [_filters]);

  return (
    <Grid container direction='column'>
      {filters.length ? (
        filters.map(([name, _filters]) => (
          <div key={name} style={{ marginBottom: 16 }}>
            <Typography
              variant='subtitle2'
              style={{ textTransform: 'uppercase' }}
            >
              {name + ' data'}
            </Typography>
            {_filters.map(([filterName, _filterItem]: any) => (
              <ActiveFilterItem
                key={filterName}
                {..._filterItem}
                id={name}
                name={filterName}
              />
            ))}
            <Divider />
          </div>
        ))
      ) : (
        <Typography variant='caption'>No hay filtros activos</Typography>
      )}
    </Grid>
  );
}
