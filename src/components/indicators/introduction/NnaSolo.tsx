import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from './utils/TitleWrapper';
import InvertedBarChart from './utils/InvertedBarChart';

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
      return category
    }
  }, [_data]);
  return (
    <Grid item lg={3}>
      <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
        <Grid item>
          <InvertedBarChart data={data} />
        </Grid>
      </TitleWrapper>
    </Grid>
  );
}