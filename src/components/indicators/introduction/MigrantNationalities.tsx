import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import IntroPieChart from './utils/IntroPieChart';
import { descending } from 'd3';

const title = 'Nacionalidad de la persona conectada';
const column = 'e08_pais_';
const subtitle = '';
const source = 'auroraData';
const id = 'topOrganisations';

export default function MigrantNationalities({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      //@ts-ignore
      return groupCategories(_data, column).sort((a, b) =>
        descending(a.value, b.value),
      );
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
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <IntroPieChart data={data} />
        {/* <PieWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          data={data}
          height={'225px'}
        /> */}
      </Grid>
    </TitleWrapper>
  );
}
