import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import IntroPieChart from './utils/IntroPieChart';

const title = 'Nacionalidad de la persona conectada';
const column = 'e08_pais_';
const subtitle = '';
const source = 'auroraData';
const id = 'topOrganisations';
const filterable = true;

export default function MigrantNationalities({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      return groupCategories(_data, column);
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
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      filterable={filterable ?? false}
    >
      <Grid item>
        <IntroPieChart
          data={data}
          filterable={filterable ?? false}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
        />
      </Grid>
    </TitleWrapper>
  );
}
