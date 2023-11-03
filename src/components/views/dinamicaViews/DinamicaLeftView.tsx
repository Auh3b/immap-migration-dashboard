import { Grid } from '@material-ui/core';
import AverageElapsedDays from 'components/indicators/dynamic/AverageElapsedDays';
import AvgDayByCountry from 'components/indicators/dynamic/AvgDayByCountry';
import MobileSurveyTimeline from 'components/indicators/dynamic/MobileSurveyTimeline';
import { useSelector } from 'react-redux';

export default function DinamicaLeftView({ dataSources }: any) {
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase) || 1;
  const { timelineSource } = dataSources;
  return (
    <Grid xs item>
      <MobileSurveyTimeline dataSource={timelineSource} />
      {phase !== 2 && (
        <>
          <AverageElapsedDays dataSource={timelineSource} />
          <AvgDayByCountry dataSource={timelineSource} />
        </>
      )}
    </Grid>
  );
}
