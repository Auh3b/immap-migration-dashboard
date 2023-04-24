import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';
import elementStyles from './utils/useElementStyle';
import useElementStyle from './utils/useElementStyle';
import useIntroCategoryChange from './hooks/useCategoryChange';

const title = 'Nacionalidad de la persona conectada';
const column = 'e08_pais_';
const subtitle = '';
const source = 'auroraData'
const id = 'topOrganisations'

export default function MigrantNationalities({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const data = useMemo(() => {
    if (_data) {
      return groupCategories(_data, column);
    }
    return [];
  }, [_data]);

  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
  })

  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <PieWidgetUI onSelectedCategoriesChange={handleSelectedCategoriesChange} data={data} height={'225px'} />
      </Grid>
    </TitleWrapper>
  );
}
