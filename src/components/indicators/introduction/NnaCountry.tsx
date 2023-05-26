import { Grid } from '@material-ui/core';
import { useCallback, useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from '../../common/TitleWrapper';
import IntroWordCloud from './utils/IntroWordCloud';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { useDispatch, useSelector } from 'react-redux';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';
import { _FilterTypes } from '@carto/react-core';

const title = 'Identificación NNA solos';
const column = 'm07__en_q';
const subtitle = '';
const dataSource = 'auroraData'
const id = 'id'

export default function NnaCountry({
  data: _data = [],
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const dispatch = useDispatch()
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);

      return category;
    }
  }, [_data]);
//@ts-ignore
  const filters = useSelector(state => state.intro.filters[dataSource]) || {}

  const onWordSelectChange = useCallback(
    ({ value }: any, selectedWord) => {
      console.log(selectedWord)
      const [x, y, text, ...rest] = value;
      if (selectedWord === text) {
        dispatch(
          removeIntroFilter({
            owner: id,
            source: dataSource,
            column: column,
          }),
        );
      } else {
        dispatch(
          addIntroFilter({
            owner: id,
            source: dataSource,
            values: [text],
            column: column,
            type: _FilterTypes.IN,
          }),
        );
      }
    }
    ,[data, dispatch, filters]
  )

  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <CustomWordCloud data={data} id={id} filters={filters} onWordSelectChange={onWordSelectChange}/>
        {/* <IntroWordCloud data={data} /> */}
      </Grid>
    </TitleWrapper>
  );
}
