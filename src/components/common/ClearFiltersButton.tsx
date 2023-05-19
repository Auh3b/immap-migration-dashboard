import { Fab, Typography, makeStyles } from '@material-ui/core';
import { useMemo } from 'react';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useClearStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.paper,
    },
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

export default function ClearFiltersButton({
  className,
  filtersCallback,
  clearCallback,
}: {
  className?: string;
  filtersCallback: Function;
  clearCallback: Function;
}) {
  const classes = useClearStyles();
  const hasFilters = useMemo(() => filtersCallback(), [filtersCallback]);

  const handleClearFilters = () => {
    clearCallback();
  };

  return (
    <span className={className}>
      {hasFilters && (
        <Fab
          onClick={handleClearFilters}
          variant='extended'
          className={classes.root}
        >
          <Typography
            color='inherit'
            variant='overline'
            className={classes.text}
          >
            Clear Filters
          </Typography>
          <ClearAllIcon />
        </Fab>
      )}
    </span>
  );
}
