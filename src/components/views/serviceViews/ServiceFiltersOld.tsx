import { Grid } from '@material-ui/core';
import ServiceStrictDateFilter from './ServiceStrictDateFilter';
import CountryFilter from 'components/filters/CountryFilter';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';

export default function ServiceFiltersOld() {
  return (
    <Grid container direction='column' item>
      <ServiceStrictDateFilter />
      <CountryFilter
        title='Seleccionar País'
        dataSource={SOURCE_NAMES.AGG_SERVICE_SOURCE}
      />
      <CountryFilter
        title='Seleccionar País - NNA'
        dataSource={SOURCE_NAMES.AGG_SERVICE_CHILDREN_SOURCE}
      />
    </Grid>
  );
}
