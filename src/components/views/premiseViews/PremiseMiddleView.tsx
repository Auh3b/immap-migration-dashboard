import { Grid, makeStyles } from '@material-ui/core';
import SickPeoplePremise from 'components/indicators/premise/SickPeoplePremise';
import ViewSourceType from '../utils/viewSourceType';
import LocationCapacity from 'components/indicators/premise/LocationCapacity';

const useStyles = makeStyles((theme) => ({
  divider: {
    borderRight: `1px solid ${theme.palette.grey[100]}`,
  },
}));

export default function PremiseMiddleView({ dataSources }: ViewSourceType) {
  const classes = useStyles();
  const { premiseSource } = dataSources;
  return (
    <Grid container item justifyContent='center'>
      <Grid item xs={12} lg={6} className={classes.divider}>
        <SickPeoplePremise dataSource={premiseSource} />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.divider}>
        <LocationCapacity dataSource={premiseSource} />
      </Grid>
    </Grid>
  );
}
