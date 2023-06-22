import { Grid } from '@material-ui/core';
import MigrationStrictFilters from './MigrationStrictFilters';

export default function MigrationFilters() {
  return (
    <Grid container direction='column' item>
      <MigrationStrictFilters />
    </Grid>
  );
}
