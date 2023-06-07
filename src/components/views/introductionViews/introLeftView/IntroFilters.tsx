import { Grid, Typography } from '@material-ui/core';
import ActiveFilterItem, {
  ActiveFilterItemProps,
} from 'components/common/ActiveFilterItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeIntroFilter } from 'store/introSlice';

type Filters = Record<string, Record<string, ActiveFilterItemProps>>;

export default function IntroFilters() {
  const dispatch = useDispatch();
  // @ts-ignore
  const filters: Filters = useSelector((state) => state.intro.filters);
  const handleRemove = (props: Partial<ActiveFilterItemProps>) => {
    const { id: owner, source, column } = props;
    dispatch(
      removeIntroFilter({
        source,
        column,
        owner,
      }),
    );
  };
  return (
    <Grid container direction='column'>
      {Object.entries(filters).map(([name, _filters]) => (
        <div key={name}>
          <Typography>{name}</Typography>
          {Object.entries(_filters).map(([filterName, _filterItem]) => (
            <ActiveFilterItem
              key={filterName}
              {..._filterItem}
              id={name}
              name={filterName}
              removeItem={handleRemove}
            />
          ))}
        </div>
      ))}
    </Grid>
  );
}
