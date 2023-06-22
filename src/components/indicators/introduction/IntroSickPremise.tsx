import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import IntroHalfPieChart from './utils/IntroHalfPieChart';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { _FilterTypes } from '@carto/react-core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import getSourceFilter from '../media/utils/getSourceFilter';
import { useSelector } from 'react-redux';
import { SICK_CATEGORY_ABREVATIONS } from '../premise/utils/premiseServiceDefinitions';
import getStringSearchValue from 'utils/getStringSearchValue';

const title = 'Retos del punto de servicio';
const column = 'princ_re_1';
const subtitle = '';
const filterable = true;
const source = 'premise';
const id = 'gente_enferma';
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const valueFormatter = Object.fromEntries(SICK_CATEGORY_ABREVATIONS);

export default function IntroSickPremise() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });
  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters) || {};
  const selectedCategories = getSourceFilter(id, _filters, source).map((d) =>
    d ? getStringSearchValue(d) : d,
  );

  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
    type: _FilterTypes.STRING_SEARCH,
    valueFormatter,
  });

  return (
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      filterable={filterable}
    >
      <Grid item>
        <IntroHalfPieChart
          filterable={filterable}
          data={data}
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
        />
      </Grid>
    </TitleWrapper>
  );
}
