import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from './utils/TitleWrapper';
import InvertedBarChart from './utils/InvertedBarChart';
import { ascending } from 'd3';

const title = 'Presencia de NNA solos';
const column = 'm06_durant';
const subtitle = '';
const id = 'nnaSolo';
export default function NnaSolo({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);
      return category.sort((a, b) => ascending(a.value, b.value))
    }
    return []
  }, [_data]);
  console.log(data)
  return (
    <Grid item lg={3}>
      <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
        <Grid item>
          <InvertedBarChart data={data} styles={{height: '100px'}}/>
        </Grid>
      </TitleWrapper>
    </Grid>
  );
}