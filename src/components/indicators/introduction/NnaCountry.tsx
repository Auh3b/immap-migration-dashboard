import { Grid } from '@material-ui/core';
import { useCallback, useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from '../../common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { useDispatch, useSelector } from 'react-redux';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';
import { _FilterTypes } from '@carto/react-core';
import getSourceFilter from '../media/utils/getSourceFilter';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Identificación NNA solos';
const column = 'm07__en_q';
const subtitle = '';
const source = 'aurora';
const id = 'id';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function NnaCountry() {
  const dispatch = useDispatch();

  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });

  //@ts-ignore
  const filters = useSelector((state) => state.intro.filters) || {};

  const onWordSelectChange = useCallback(
    (words) => {
      if (words.length) {
        dispatch(
          addIntroFilter({
            owner: id,
            source,
            values: words,
            column,
            type: _FilterTypes.IN,
          }),
        );
      } else {
        dispatch(
          removeIntroFilter({
            owner: id,
            source,
            column,
          }),
        );
      }
    },
    [data, dispatch, filters],
  );

  const selectedWords = getSourceFilter(id, filters, source) || [];

  return (
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      filterable
    >
      <Grid item>
        <CustomWordCloud
          data={data}
          selectedWords={selectedWords}
          onWordSelectChange={onWordSelectChange}
        />
      </Grid>
    </TitleWrapper>
  );
}
