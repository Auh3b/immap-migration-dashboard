import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { SERVICES_KEY } from './utils/premiseServiceDefinitions';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE =
  'El punto de servicio / ayuda humanitaria cuenta con estos servicios para las personas migrantes';
const id = 'serviceProvided';
const title = 'Tipos de servicios prestados en el punto';
const column = 'serv_tipo1';
const filterType = _FilterTypes.STRING_SEARCH;
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const labels = Object.fromEntries(SERVICES_KEY);

const props = {
  id,
  title,
  column,
  methodName,
  filterable: false,
  filterType,
  labels,
  filterParams: {
    useRegExp: true,
  },
};

export default function ServicesProvided({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomPieWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
