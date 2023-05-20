import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';

const id = 'topPhrases';

export default function TopPhrases() {
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_PHRASES,
  });

  return (
    <Grid xs={12} lg={4} item>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading}>
        <CustomWordCloud data={data} />
      </TitleWrapper>
    </Grid>
  );
}
