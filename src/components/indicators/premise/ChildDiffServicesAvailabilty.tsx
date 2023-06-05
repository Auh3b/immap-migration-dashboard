import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Servicios diferenciados para NNA';
const NOTE =
  'El punto de servicio/ayuda humanitaria actualmente cuenta con servicios diferenciados para niños, niñas y adolescentes?';
const id = 'childrenDiffirentiatedServicesAvailability';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

const props = {
  title,
  column,
  id,
  filterType,
  methodName,
};

export default function ChildDiffServicesAvailabilty({
  dataSource,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
