import { Grid } from '@material-ui/core';
import CustomColumnChart from 'components/common/customCharts/CustomColumnChart';
import TitleWrapper from 'components/common/TitleWrapper';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

const id = 'mediaOrigins';

export default function MediaOrigin() {
  const { data = [], isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_ORIGINS,
  });

  return (
    <Grid item xs={12} lg={4}>
      <TitleWrapper title='¿De dónde escribe?' isLoading={isLoading}>
        {data.length > 0 && (
          <CustomColumnChart
            data={data}
            labelFormater={(name: string) => regionName.of(name.toUpperCase())}
          />
        )}
      </TitleWrapper>
    </Grid>
  );
}
