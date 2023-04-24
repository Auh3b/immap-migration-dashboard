import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';

const title = 'Distribución por zona geográfica donde la  persona conectó';
const column = 'e004_regio';
const subtitle = '';
const source = 'auroraData';
const id = 'auroraLocations';

export default function AuroraLocation({
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
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <PieWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          data={data}
          height={'225px'}
        />
      </Grid>
    </TitleWrapper>
  );
}
