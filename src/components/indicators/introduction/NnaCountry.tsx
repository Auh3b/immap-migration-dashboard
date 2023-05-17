import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import TitleWrapper from '../../common/TitleWrapper';
import IntroWordCloud from './utils/IntroWordCloud';

const title = 'Identificación NNA solos';
const column = 'm07__en_q';
const subtitle = '';

export default function NnaCountry({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const category = groupCategories(_data, column);

      return category;
    }
  }, [_data]);

  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <IntroWordCloud data={data} />
      </Grid>
    </TitleWrapper>
  );
}
