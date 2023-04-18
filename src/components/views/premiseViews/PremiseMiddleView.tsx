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
    <Grid container item>
      <Grid item xs={3} className={classes.divider}>
        <SickPeoplePremise dataSource={premiseSource} />
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        <LocationCapacity dataSource={premiseSource} />
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        
      </Grid>
    </Grid>
  );
}
