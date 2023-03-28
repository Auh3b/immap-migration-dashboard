import { Grid, makeStyles } from '@material-ui/core';
import ObservedDate from 'components/indicators/premise/ObservedDate';
import SickPeoplePremise from 'components/indicators/premise/SickPeoplePremise';
import ViewSourceType from '../utils/viewSourceType';

const useStyles = makeStyles((theme) => ({
  divider: {
    borderRight: `1px solid ${theme.palette.grey[100]}`,
  },
}));

export default function PremiseMiddleView({ dataSources }: ViewSourceType) {
  const classes = useStyles();
  const { premiseSource } = dataSources;
  return (
    <Grid container item>
      <Grid item xs={8} className={classes.divider}>
        <ObservedDate dataSource={premiseSource} />
      </Grid>
      <Grid item xs={4}>
        <SickPeoplePremise dataSource={premiseSource} />
      </Grid>
    </Grid>
  );
}
