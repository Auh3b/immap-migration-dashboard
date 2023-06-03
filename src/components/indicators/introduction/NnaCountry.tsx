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
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES

export default function NnaCountry() {
  const dispatch = useDispatch();

    const { data, isLoading} = useIntroData({
    id,
    column,
    source,
    methodName,
  })

  //@ts-ignore
  const filters = useSelector((state) => state.intro.filters[dataSource]) || {};

  const onWordSelectChange = useCallback(
    ({ value }: any, selectedWord) => {
      console.log(selectedWord);
      const [x, y, text, ...rest] = value;
      if (selectedWord === text) {
        dispatch(
          removeIntroFilter({
            owner: id,
            source,
            column,
          }),
        );
      } else {
        dispatch(
          addIntroFilter({
            owner: id,
            source,
            values: [text],
            column,
            type: _FilterTypes.IN,
          }),
        );
      }
    },
    [data, dispatch, filters],
  );

  const selectedWord = useMemo(
    () => getSourceFilter(id, filters, source)[0] || '',
    [filters, id],
  );

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
          selectedWord={selectedWord}
          onWordSelectChange={onWordSelectChange}
        />
      </Grid>
    </TitleWrapper>
  );
}
