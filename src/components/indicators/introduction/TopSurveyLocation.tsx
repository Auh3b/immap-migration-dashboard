import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { descending } from 'd3';
import TitleWrapper from './utils/TitleWrapper';
import { useDispatch } from 'react-redux';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';

const title = 'Total de encuestas por área de recolección';
const column = 'erm';
const subtitle = '';
const source = 'premiseData';
const id = 'topSurveySites';
export default function TopSurveyLocation({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);
      return category;
    }
    return [];
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
