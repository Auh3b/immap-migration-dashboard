import { Grid, Typography } from '@material-ui/core';
import ActiveFilterItem, {
  ActiveFilterItemProps,
} from 'components/common/ActiveFilterItem';
import { useSelector } from 'react-redux';

type Filters = Record<string, Record<string, ActiveFilterItemProps>>;

export default function IntroActiveFilters() {
  // @ts-ignore
  const filters: Filters = useSelector((state) => state.intro.filters);
  return (
    <Grid container direction='column'>
      {Object.entries(filters).map(([name, _filters]) => (
        <div key={name}>
          <Typography
            variant='subtitle2'
            style={{ textTransform: 'uppercase' }}
          >
            {name + ' data'}
          </Typography>
          {Object.entries(_filters).map(([filterName, _filterItem]) => (
            <ActiveFilterItem
              key={filterName}
              {..._filterItem}
              id={name}
              name={filterName}
            />
          ))}
        </div>
      ))}
    </Grid>
  );
}
