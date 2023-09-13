import { CriteriaSelectors } from './CriteriaSelectors';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import MediaStrictDateFilter from './MediaStrictDateFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  title: {
    ...theme.typography.subtitle1,
    width: '100%',
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
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
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction='column'
      wrap='nowrap'
      alignItems='stretch'
      justifyContent='space-between'
    >
      <Typography className={classes.title}>filtros adicionales</Typography>
      <MediaStrictDateFilter />
      {/* <CriteriaSelectors /> */}
    </Grid>
  );
}
