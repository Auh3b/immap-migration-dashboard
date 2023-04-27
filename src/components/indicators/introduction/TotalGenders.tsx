import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from './utils/TitleWrapper';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { Grid} from '@material-ui/core';
import InvertedBarChart from './utils/InvertedBarChart';
import { ascending } from 'd3';

const title = 'Géneros';
const subtitle = '';
const column = 'e07_gener';
const id = 'totalGenders';
const source = 'auroraData';

export default function TotalGenders({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const dataset = groupCategories(_data, column);
      //@ts-ignore
      return dataset.sort((a, b) => ascending(a.value, b.value))
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

  return (
    <Grid item lg={3}>
      <TitleWrapper
        title={title}
        subtitle={subtitle}
        isLoading={isLoading}
      >
        <InvertedBarChart data={data} styles={{height: '100px',}} />
      </TitleWrapper>
    </Grid>
  );
}
