import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import TitleWrapper from './utils/TitleWrapper';

const title = 'Distribución por zona geográfica donde la  persona conectó';
const column = 'e004_regio';
const subtitle = '';

export default function AuroraLocation({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const data = useMemo(() => {
    if (_data) {
      return groupCategories(_data, column);
    }
    return [];
  }, [_data]);

  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <PieWidgetUI data={data} height={'225px'} />
      </Grid>
    </TitleWrapper>
  );
}
