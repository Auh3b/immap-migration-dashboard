import OrganisationCount from 'components/indicators/introduction/OrganisationCount';
import TopSurveyLocation from 'components/indicators/introduction/TopSurveyLocation';
import { Grid, makeStyles } from '@material-ui/core';
import { UNICEF_COLORS } from 'theme';
import TopServices from 'components/indicators/introduction/TopServices';

export const useRightStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: '100%',
    maxHeight: '85vh',
    BorderLeft: `1px solid ${UNICEF_COLORS[0]}`,
    [theme.breakpoints.down('md')]: {
      overflow: 'none',
      height: 'none',
      maxHeight: 'none',
    },
  },
}));
export default function IntroRightView() {
  const classes = useRightStyles();
  return (
    <Grid
      container
      wrap='nowrap'
      direction='column'
      item
      md={12}
      lg={3}
      className={classes.root}
    >
      <OrganisationCount />
      <TopServices />
      <TopSurveyLocation />
    </Grid>
  );
}
