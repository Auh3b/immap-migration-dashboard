import { Grid } from '@material-ui/core';
import MobileSurveyTimeline from 'components/indicators/dynamic/MobileSurveyTimeline';

export default function DinamicaMiddleView({ dataSources, classes }: any) {
  const { premiseSource, mainSource } = dataSources;
  return (
    <Grid xs item>
      <MobileSurveyTimeline dataSource={mainSource} />
    </Grid>
  );
}
