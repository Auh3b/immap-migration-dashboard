import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Espacios seguros'],
  [2, 'Duchas o baños'],
  [3, 'Gestión de casos de violencias basadas en género'],
  [4, 'Productos de higiene menstrual'],
  [5, 'Otro'],
]);

const NOTE =
  'Servicios diferenciados para mujeres se ofrecen en el punto de servicio / ayuda humanitaria ';
const id = 'womenDifferentedServices';
const title = 'Cuales servicios diferenciados para mujeres';
const column = 'cual_ser_2';
const filterType = _FilterTypes.STRING_SEARCH;
const method = concatenatedValues;
const labels = Object.fromEntries(CATEGORY_ABREVATIONS);

const props = {
  id,
  title,
  column,
  method,
  filterType,
  labels,
};

export default function WomenDiffServices({ dataSource }: BasicWidgetType) {
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
