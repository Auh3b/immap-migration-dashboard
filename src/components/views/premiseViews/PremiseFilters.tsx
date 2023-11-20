import { Grid } from '@material-ui/core';
import CountryFilter from 'components/filters/CountryFilter';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';

export default function PremiseFilters() {
  return (
    <Grid container direction='column' item>
      <CountryFilter
        title='Seleccionar País'
        dataSource={SOURCE_NAMES.PREMISE_SOURCE}
      />
    </Grid>
  );
}
