import { Grid } from '@material-ui/core';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from '../../common/TitleWrapper';
import InvertedBarChart from './utils/InvertedBarChart';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';
import { useSelector } from 'react-redux';
import getSourceFilter from '../media/utils/getSourceFilter';

const title = 'Presencia de NNA solos';
const column = 'm06_durant';
const subtitle = '';
const id = 'nnaSolo';
const source = 'aurora'
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES

export default function NnaSolo() {
  
  const { data, isLoading} = useIntroData({
    id,
    column,
    source,
    methodName,
  })

 //@ts-ignore
  const _filters = useSelector((state)=> state.intro.filters) || {}
  const selectedCategories = getSourceFilter(id,_filters,source);

  return (
    <Grid item lg={3}>
      <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
        <Grid item>
          <InvertedBarChart data={data} styles={{ height: '100px' }} />
        </Grid>
      </TitleWrapper>
    </Grid>
  );
}
