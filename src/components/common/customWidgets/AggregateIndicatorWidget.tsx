import { Grid, Typography, makeStyles } from '@material-ui/core';
import { FormulaWidgetUI } from '@carto/react-ui';
import { numberFormatter } from 'utils/formatter';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function AggregateIndicatorWidget(props: {
  title: string;
  isLoading?: Boolean;
  data: number;
  icon: ReactNode;
  gridSize?: number | Boolean | string;
  formatter?: any
}) {
  const { title, data, isLoading = false, icon, formatter = numberFormatter } = props;
  const classes = useStyles();
  return (
    <Grid item container direction='column' className={classes.root}>
      <Typography>{title}</Typography>
      <Grid spacing={1} wrap='nowrap' container alignItems='center'>
        <Grid item xs={3}>
          {icon}
        </Grid>
        {data && !isLoading && (
          <Grid xs={5} item>
            <FormulaWidgetUI data={data} formatter={formatter} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
