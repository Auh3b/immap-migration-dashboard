import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import IntroPieChart from '../../common/customCharts/CustomPieWidgetUI';
import getSourceFilter from '../media/utils/getSourceFilter';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const title = 'Nacionalidad de la persona conectada';
const column = 'e08_pais_';
const subtitle = '';
const source = 'aurora';
const id = 'topOrganisations';
const filterable = true;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function MigrantNationalities() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });
  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters) || {};
  const selectedCategories = useMemo(
    () => getSourceFilter(id, _filters, source),
    [_filters],
  );

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
