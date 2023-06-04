import groupCategories, { Sort_Type } from '../utils/groupCategories';
import TitleWrapper from '../../common/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { Grid } from '@material-ui/core';
import InvertedBarChart from './utils/InvertedBarChart';
import getSourceFilter from '../media/utils/getSourceFilter';
import { useSelector } from 'react-redux';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Géneros';
const subtitle = '';
const column = 'e07_gener';
const id = 'totalGenders';
const source = 'aurora';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const methodParams = {
  sortType: Sort_Type.ASC,
};

export default function TotalGenders() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
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
    <Grid item lg={3}>
      <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
        <InvertedBarChart data={data} styles={{ height: '100px' }} />
      </TitleWrapper>
    </Grid>
  );
}
