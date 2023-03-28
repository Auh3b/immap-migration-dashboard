import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Acceso a servicio eléctrico'],
  [2, 'Acceso a servicio de Internet'],
  [3, 'Área de comedores/ cocina'],
  [4, 'Áreas comunes'],
  [5, 'Áreas de registro de la población'],
  [6, 'Áreas de lavandería'],
  [7, 'Área para disposición de basuras'],
  [8, 'Ninguna de las anteriores']
]);

const NOTE = 'Dotaciones del punto de servicio para atender a la población.  ';
const id = 'locationFeatures';
const title = 'Características punto de ayuda';
const column = 'cuenta_c_1';
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

export default function LocationFeatures({ dataSource }: BasicWidgetType) {
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

