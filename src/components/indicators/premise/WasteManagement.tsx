import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const title = 'Gestión de residuos';
const NOTE = 'El entorno del punto de servicio tiene problemas de contaminación de basuras';
const id = 'wasteManagement';
const column = 'serv_basur';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function WasteManagement({ dataSource }: BasicWidgetType) {
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