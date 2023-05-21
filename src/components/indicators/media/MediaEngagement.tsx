import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomGriddedLineChart from 'components/common/customCharts/CustomGriddedLineChart';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';

const id = 'mediaEngagement';

export default function MediaEngagement() {
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_ENGAGEMENT_HISTORY,
  });

  return (
    <Grid item xs={12}>
      <TitleWrapper title='Serie de compromiso histórico' isLoading={isLoading}>
        <CustomGriddedLineChart data={data} />
      </TitleWrapper>
    </Grid>
  );
}
