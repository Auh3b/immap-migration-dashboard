import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';
import { SERVICES_KEY } from './utils/services';

const NOTE =
  'El punto de servicio / ayuda humanitaria cuenta con estos servicios para las personas migrantes';
const id = 'servicesProvided';
const title = 'Tipos de servicios prestados en el punto';
const column = 'serv_tipo1';
const filterType = _FilterTypes.STRING_SEARCH;
const method = concatenatedValues;
const labels = Object.fromEntries(SERVICES_KEY);

const props = {
  id,
  title,
  column,
  method,
  filterType,
  labels,
};

export default function ServicesProvided({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
