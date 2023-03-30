import { Grid } from '@material-ui/core';
import MobileSurveyTimeline from 'components/indicators/dynamic/MobileSurveyTimeline';

export default function DinamicaLeftView({ dataSources, classes }: any) {
  const { premiseSource, mainSource, timelineSource } = dataSources;
  return (
    <Grid xs item>
      <MobileSurveyTimeline dataSource={mainSource} />
    </Grid>
  );
}
