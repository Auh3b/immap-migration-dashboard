import { Grid, Typography, makeStyles } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useErrorStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    Height: '100%',
    minWidth: '150px',
    minHeight: '200px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: '1px solid' + theme.palette.divider,
  },
}));

export default function ComponentError({
  message = 'Something went wrong',
}: {
  message?: string;
}) {
  const classes = useErrorStyles();
  return (
    <Grid
      className={classes.root}
      item
      container
      direction='column'
      alignItems='center'
    >
      <ErrorOutlineIcon color='error' />
      <Typography>{message}</Typography>
    </Grid>
  );
}
