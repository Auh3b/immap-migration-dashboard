import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Conseguir la financiación necesaria'],
  [2, 'Mejorar la capacidad de los servicios ofrecidos'],
  [3, 'Ampliar y mejorar la colaboración con otras entidades'],
  [4, 'Mejorar la visibilidad del trabajo realizado'],
  [5, 'Medir y comunicar el impacto social de los servicios prestados '],
  [6, 'Comunicación con los usuarios '],
  [7, 'Otro'],
]);

const NOTE =
  'Principales retos a los que se enfrenta el punto de servicio / ayuda humanitaria';
const id = 'sickPeoplePremise';
const title = 'Retos del punto de servicio';
const column = 'princ_re_1';
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

export default function SickPeoplePremise({ dataSource }: BasicWidgetType) {
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
