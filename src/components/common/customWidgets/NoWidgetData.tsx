import { Grid, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));
export default function NoWidgetData({}) {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Typography>
        No hay datos disponibles con los filtros seleccionados
      </Typography>
    </Grid>
  );
}
