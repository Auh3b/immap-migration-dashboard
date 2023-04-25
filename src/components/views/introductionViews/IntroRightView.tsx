import OrganisationCount from 'components/indicators/introduction/OrganisationCount';
import TopOrganisations from 'components/indicators/introduction/TopOrganisations';
import TopSurveyLocation from 'components/indicators/introduction/TopSurveyLocation';
import PrincipalsImplementor from 'components/indicators/introduction/PrincipalsImplementor';
import { Grid, makeStyles } from '@material-ui/core';
import { IndicatorProps } from 'components/indicators/introduction/utils/introductionTypes';
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
export default function IntroRightView({ data, isLoading }: IndicatorProps) {
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
      <OrganisationCount data={data} isLoading={isLoading} />
      <TopServices data={data} isLoading={isLoading} />
      <TopSurveyLocation data={data} isLoading={isLoading} />
      <TopOrganisations data={data} isLoading={isLoading} />
      {/* <PrincipalsImplementor data={data} isLoading={isLoading} /> */}
    </Grid>
  );
}
