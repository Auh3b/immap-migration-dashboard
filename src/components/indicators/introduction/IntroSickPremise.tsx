import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';
import useIntroCategoryChange from './hooks/useCategoryChange';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import IntroPieChart from './utils/IntroPieChart';
import { descending } from 'd3';
import concatenatedValues from '../utils/concatenatedValues';
import { SICK_CATEGORY_ABREVATIONS } from '../premise/utils/services';

const title = 'Retos del punto de servici';
const column = 'princ_re_1';
const subtitle = '';
const source = 'premiseData';
const id = 'topOrganisations';

export default function IntroSickPremise({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      //@ts-ignore
      return concatenatedValues(_data, column).map(({name, value})=>({value, name: SICK_CATEGORY_ABREVATIONS.get(+name)})).sort((a, b) => descending(a.value, b.value));
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

  console.log(data)

  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <IntroPieChart data={data} />
      </Grid>
    </TitleWrapper>
  );
}