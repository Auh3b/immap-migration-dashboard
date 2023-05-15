import { useMemo } from 'react';
import TitleWrapper from './utils/TitleWrapper';
import { IndicatorProps } from './utils/introductionTypes';
import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import groupCategories from '../utils/groupCategories';

const title = 'PUNTOS DE SERVICIOS SOBREPASADOS EN SU CAPACIDAD';
const subtitle = '';
const column = 'sobrepasa_';
const id = 'topServices';
const source = 'premiseData';

export default function TopServices({
  data: _data,
  isLoading,
}: IndicatorProps) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column, { filter: false });
      return category;
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
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      filterable={true}
      isLoading={isLoading}
    >
      <Grid item>
        <CategoryWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          data={data}
          labels={{ '999999': 'No responde' }}
        />
      </Grid>
    </TitleWrapper>
  );
}
