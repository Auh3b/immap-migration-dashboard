import { Grid } from '@material-ui/core';
import MigrationStrictFilters from './MigrationStrictFilters';
import CountryFilter from 'components/filters/CountryFilter';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';

export default function MigrationFilters() {
  return (
    <Grid container direction='column' item>
      <MigrationStrictFilters />
      <CountryFilter dataSource={SOURCE_NAMES.MAIN_SOURCE} />
    </Grid>
  );
}
