import { Button, makeStyles } from '@material-ui/core';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { clearFilterFuncion } from 'utils/stateFunction';
import { StateSlices } from 'utils/types';

const useClearStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1),
    border: '0.5px solid ' + theme.palette.error.main,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.paper,
    },
  },
  text: {
    width: '100%',
    marginRight: theme.spacing(2),
  },
}));

export default function ClearFiltersButton({
  className,
  disabled,
  filterSource,
}: {
  className?: string;
  disabled: Boolean;
  filterSource: StateSlices;
}) {
  const dispatch = useDispatch();
  const classes = useClearStyles();
  const clearFunction = useMemo(
    () => clearFilterFuncion[filterSource],
    [filterSource],
  );
  const dataSources = useSelector(
    (state: RootState) => state.carto.dataSources,
  );
  const sources = useMemo(() => Object.keys(dataSources) || [], [dataSources]);
  const handleClearFilters = useCallback(() => {
    if (sources.length) {
      sources.forEach((d) => {
        dispatch(clearFunction(d));
      });
    } else {
      dispatch(clearFunction());
    }
  }, [clearFunction, sources]);

  return (
    <span className={className}>
      {!disabled && (
        <Button
          variant='contained'
          onClick={handleClearFilters}
          className={classes.root}
        >
          filtros claros
        </Button>
      )}
    </span>
  );
}
