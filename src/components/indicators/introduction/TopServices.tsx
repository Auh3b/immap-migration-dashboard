import TitleWrapper from '../../common/TitleWrapper';
import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import { useSelector } from 'react-redux';
import getSourceFilter from '../media/utils/getSourceFilter';

const title = 'PUNTOS DE SERVICIOS SOBREPASADOS EN SU CAPACIDAD';
const subtitle = '';
const column = 'sobrepasa_';
const id = 'top_Servicios';
const source = 'premise';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function TopServices() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });
  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters) || {};
  const selectedCategories = getSourceFilter(id, _filters, source);

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
          labels={{
            '': 'No responde',
            '999999': 'No responde',
            lospatios: 'Los Patios',
            dtlobito: 'DT Lobito',
            loschiles: 'Los Chiles',
          }}
        />
      </Grid>
    </TitleWrapper>
  );
}
