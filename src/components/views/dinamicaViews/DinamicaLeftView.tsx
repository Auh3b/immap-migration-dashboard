import { Grid } from '@material-ui/core';
import AverageElapsedDays from 'components/indicators/dynamic/AverageElapsedDays';
import MobileSurveyTimeline from 'components/indicators/dynamic/MobileSurveyTimeline';

export default function DinamicaLeftView({ dataSources, classes }: any) {
  const { mainSource, timelineSource } = dataSources;
  return (
    <Grid xs item>
      <MobileSurveyTimeline dataSource={timelineSource} />
      <AverageElapsedDays dataSource={timelineSource}/>
    </Grid>
  );
}
