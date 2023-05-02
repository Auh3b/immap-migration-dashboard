import { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';
import { descending } from 'd3';
import concatenatedValues from '../utils/concatenatedValues';
import { SICK_CATEGORY_ABREVATIONS } from '../premise/utils/services';
import IntroHalfPieChart from './utils/IntroHalfPieChart';

const title = 'Retos del punto de servicio';
const column = 'princ_re_1';
const subtitle = '';

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
      return concatenatedValues(_data, column)
        .map(({ name, value }) => ({
          value,
          name: SICK_CATEGORY_ABREVATIONS.get(+name),
        }))
        .sort((a, b) => descending(a.value, b.value));
    }
    return [];
  }, [_data]);

  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <IntroHalfPieChart data={data} />
      </Grid>
    </TitleWrapper>
  );
}
