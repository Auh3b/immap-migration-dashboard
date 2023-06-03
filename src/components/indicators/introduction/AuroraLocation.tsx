import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import IntroPieChart from './utils/IntroPieChart';
import useIntroCategoryChange from './hooks/useCategoryChange';
import getSourceFilter from '../media/utils/getSourceFilter';
import { useSelector } from 'react-redux';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Distribución por zona geográfica donde la  persona conectó';
const column = 'e004_regio';
const subtitle = '';
const id = 'auroraLocations';
const source = 'aurora';
const filterable = true;
const methodName =  EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES

export default function AuroraLocation() {
  
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  })

  //@ts-ignore
  const _filters = useSelector((state)=> state.intro.filters) || {}
  const selectedCategories = getSourceFilter( source,id,_filters);
  const handleSelectedCategoriesChange = useIntroCategoryChange({source,column,owner: id,});

  return (
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      filterable={filterable}
    >
      <Grid item>
        <IntroPieChart
          data={data}
          filterable={filterable}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
        />
      </Grid>
    </TitleWrapper>
  );
}
