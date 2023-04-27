import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from './utils/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';

const title = 'Identificación NNA solos';
const column = 'm07__en_q';
const subtitle = '';
const source = 'auroraData';
const id = 'nnaCountry';
export default function NnaCountry({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);
     
      return category
    }
  }, [_data]);

  const selectedCategories = useIntroWidgetFilter({
    source,
    owner: id,
  });

  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
  });

  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <CategoryWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          data={data}
        />
      </Grid>
    </TitleWrapper>
  );
}