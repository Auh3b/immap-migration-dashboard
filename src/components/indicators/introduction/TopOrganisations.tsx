import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { descending } from 'd3';
import TitleWrapper from './utils/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';

const title = 'Top de 5 organizaciones';
const column = 'org_pert';
const subtitle = 'Top 5 de organizaciones implementadoras de servicios, (Para ver todas las organizaciones, diríjase a la pestaña de servicios';
const source = 'premiseData';
const id = 'topOrganisations';
export default function TopOrganisations({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);
      //@ts-ignore
      const top5 = category.sort((a, b) => descending(a.value, b.value));
      return top5.slice(0, 5);
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
