import { Grid, makeStyles } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';
import { useDispatch, useSelector } from 'react-redux';
import ContinuousLegend from 'components/common/customCharts/ContinuousLegend';
import { useCallback } from 'react';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';

const id = 'top_phrases';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
const dataSource = 'meltwater';
const column = 'topPhrases';

export default function TopPhrases() {
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_PHRASES,
  });
  const dispatch = useDispatch();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters?.meltwater) || {};
  const classes = useStyles();
  const onWordSelectChange = useCallback(
    ({ value }: any, selectedWord: string) => {
      const [x, y, text, ...rest] = value;
      if (selectedWord === text) {
        dispatch(
          removeMediaFilter({
            owner: id,
            source: dataSource,
            column,
          }),
        );
      } else {
        dispatch(
          addMediaFilter({
            owner: id,
            source: dataSource,
            values: [text],
            column,
            type: FilterTypes.WORD_CLOUD_IN,
          }),
        );
      }
    },
    [dispatch, data],
  );
  return (
    <Grid xs={12} lg={4} item className={classes.root}>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading}>
        <CustomWordCloud
          onWordSelectChange={onWordSelectChange}
          data={data}
          filters={filters}
          id={id}
        />
        <ContinuousLegend colorScheme={['#fd8d3c', '#800026']} />
        {!data.length && !isLoading && <NoWidgetData />}
      </TitleWrapper>
    </Grid>
  );
}
