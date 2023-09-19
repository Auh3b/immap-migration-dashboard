import { Grid, makeStyles } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';
import { useDispatch, useSelector } from 'react-redux';
import ContinuousLegend from 'components/common/customCharts/ContinuousLegend';
import { useCallback, useContext, useMemo } from 'react';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';
import getSourceFilter from './utils/getSourceFilter';
import { MediaCountryContext } from 'components/views/mediaViews/utils';
import useViewFilterContinuity from './hooks/useViewFilterContinuity';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
const source = 'meltwater';
const column = 'topPhrases';

export default function TopPhrases() {
  const { value: countryIndex, label: viewFilter } =
    useContext(MediaCountryContext);
  const id = 'Palabras_asociadas' + (viewFilter ? `_${viewFilter}` : '');
  useViewFilterContinuity(id, countryIndex);
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_PHRASES,
    source,
    viewFilter,
  });
  const dispatch = useDispatch();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters) || {};
  const classes = useStyles();
  const onWordSelectChange = useCallback(
    (words) => {
      if (words.length) {
        dispatch(
          addMediaFilter({
            owner: id,
            source,
            values: words,
            column,
            type: FilterTypes.WORD_CLOUD_IN,
          }),
        );
      } else {
        dispatch(
          removeMediaFilter({
            owner: id,
            source,
            column,
          }),
        );
      }
    },
    [dispatch, data],
  );

  const selectedWords = useMemo(
    () => getSourceFilter(id, filters, source) || [],
    [filters, id],
  );
  return (
    <Grid xs={12} lg={viewFilter ? 12 : 4} item className={classes.root}>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading} filterable>
        <CustomWordCloud
          onWordSelectChange={onWordSelectChange}
          data={data}
          selectedWords={selectedWords}
        />
        <ContinuousLegend colorScheme={['#fd8d3c', '#800026']} />
        {!data.length && !isLoading && <NoWidgetData />}
      </TitleWrapper>
    </Grid>
  );
}
