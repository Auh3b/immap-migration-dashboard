import { Fab, Typography, makeStyles } from "@material-ui/core";
import { useMemo } from "react";
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useClearStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(4) * -1,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

export default function ClearFiltersButton({
  filtersCallback,
  clearCallback
}: {
  filtersCallback: Function;
  clearCallback: Function;
}) {
  const classes = useClearStyles();
  const hasFilters = useMemo(() => filtersCallback(), [filtersCallback]);

  const handleClearFilters = () => {
    clearCallback()
  };

  return <>
      {hasFilters && <Fab onClick={handleClearFilters} size='large' variant='extended' className={classes.root}>
          <Typography color='inherit' variant='overline' className={classes.text}>
            Clear Filters
          </Typography>
          <ClearAllIcon />
        </Fab>}
    </>;
}
  