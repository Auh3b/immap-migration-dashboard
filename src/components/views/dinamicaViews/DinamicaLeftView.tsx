import { Grid } from '@material-ui/core';
import AverageElapsedDays from 'components/indicators/dynamic/AverageElapsedDays';
import AvgDayByCountry from 'components/indicators/dynamic/AvgDayByCountry';
import MobileSurveyTimeline from 'components/indicators/dynamic/MobileSurveyTimeline';

export default function DinamicaLeftView({ dataSources }: any) {
  const { timelineSource } = dataSources;
  return (
    <Grid xs item>
      <MobileSurveyTimeline dataSource={timelineSource} />
      <AverageElapsedDays dataSource={timelineSource} />
      <AvgDayByCountry dataSource={timelineSource} />
    </Grid>
  );
}
