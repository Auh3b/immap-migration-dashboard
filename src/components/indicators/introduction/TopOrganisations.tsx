import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import getSourceFilter from '../media/utils/getSourceFilter';
import { useSelector } from 'react-redux';

const title = 'Top de 5 organizaciones';
const column = 'org_pert';
const subtitle =
  'Top 5 de organizaciones implementadoras de servicios, (Para ver todas las organizaciones, diríjase a la pestaña de servicios)';
const source = 'premise';
const id = 'topOrganisations';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
export default function TopOrganisations() {
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
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
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
