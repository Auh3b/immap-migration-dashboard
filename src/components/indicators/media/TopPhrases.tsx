import { Grid, makeStyles } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';
import { useSelector } from 'react-redux';
import ContinuousLegend from 'components/common/customCharts/ContinuousLegend';

const id = 'top_phrases';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

export default function TopPhrases() {
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_PHRASES,
  });
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters?.meltwater) || {};
  const classes = useStyles();
  return (
    <Grid xs={12} lg={4} item className={classes.root}>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading}>
        <CustomWordCloud data={data} filters={filters} id={id} />
        <ContinuousLegend colorScheme={['#fd8d3c', '#800026']} />
      </TitleWrapper>
    </Grid>
  );
}
