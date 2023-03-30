import { Grid, makeStyles } from '@material-ui/core';
import ComplaintReporting from 'components/indicators/premise/ComplaintReporting';
import InfoLanguages from 'components/indicators/premise/InfoLanguages';
import OtherLanguges from 'components/indicators/premise/OtherLanguges';
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
      <Grid item xs={3} className={classes.divider}>
        <SickPeoplePremise dataSource={premiseSource} />
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        <InfoLanguages dataSource={premiseSource} />
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        <OtherLanguges dataSource={premiseSource} />
      </Grid>
      <Grid item xs={3} className={classes.divider}>
        <ComplaintReporting dataSource={premiseSource} />
      </Grid>
    </Grid>
  );
}
