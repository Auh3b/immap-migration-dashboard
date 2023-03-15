import {
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomComparativeCategoryWidget from 'components/common/customWidgets/CustomComparativeCategoryWidget';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import stackedGroupCategories from '../utils/stackedGroupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const labels = new Map([
  [0, 'No calificado'],
  [1, 'Sí recomendaría'],
  [2, 'No estoy seguro(a)'],
  [3, 'No recomendaría'],
])

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Alimentación o kit de alimentación'],
  [2, 'Alojamiento temporal'],
  [3, 'Salud, primeros auxilios o atención médica'],
  [4, 'Agua'],
  [5, 'Duchas o baños'],
  [6, 'Kit de inodoro o elementos de higiene'],
  [7, 'Información / asistencia legal'],
  [8, 'Ayuda psicológica'],
  [9, 'Dinero en efectivo'],
  [10, 'Transporte humanitario'],
  [11, 'Otro'],
]);

const NOTE = 'Nivel de satisfacción del servicio tomado';
const id = 'serviceSatisfaction';
const title = 'Satisfacción del servicio';
const column = 'm16_de_acu';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategories;
const methodParams = {
  CATEGORY_ABREVATIONS, labels
}

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
};

export default function ServiceSatisfyAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomComparativeCategoryWidget 
      {...props}
      dataSource={dataSource}
    />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
