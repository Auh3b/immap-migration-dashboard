import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import { useSelector } from 'react-redux';
import getSourceFilter from '../media/utils/getSourceFilter';

const title = 'Total de encuestas por área de recolección';
const column = 'erm';
const subtitle = '';
const source = 'premise';
const id = 'topSurveySites';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
export default function TopSurveyLocation() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });
  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters) || {};
  const selectedCategories = getSourceFilter(id, _filters, source) || [];

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
      filterable={true}
    >
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
