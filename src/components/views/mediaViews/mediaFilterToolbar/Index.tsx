import { CriteriaSelectors } from './CriteriaSelectors';
import { Grid, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaStrictDataFilter from './MediaStrictDataFilter';
import { clearMediaFilters } from 'store/mediaSlice';
import ClearFiltersButton from 'components/common/ClearFiltersButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  clear: {
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[800],
      color: 'white',
    },
  },
  filters: {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
}));

export default function MediaFilterToolbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters);
  const disabled = useMemo(
    () => Object.keys(filters?.meltwater ?? {}).length === 0,
    [filters],
  );

  return (
    <Grid
      container
      item
      direction='column'
      wrap='nowrap'
      alignItems='center'
      justifyContent='space-between'
    >
      <MediaStrictDataFilter />
      {/* <DateFilter /> */}
      <CriteriaSelectors />
      <div className={classes.filters}>
        <ClearFiltersButton
          clearCallback={() => dispatch(clearMediaFilters())}
          disabled={disabled}
        />
      </div>
    </Grid>
  );
}
