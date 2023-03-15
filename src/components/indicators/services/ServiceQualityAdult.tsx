import {
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomComparativeCategoryWidget from 'components/common/customWidgets/CustomComparativeCategoryWidget';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { rollup } from 'd3';
import groupCategories from '../utils/groupCategories';
import stackedGroupCategories from '../utils/stackedGroupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const labels = new Map([
  [0, 'No calificado'],
  [1, 'Satisfecho'],
  [2, 'Algo satisfecho'],
  [3, 'Insatisfecho'],
]);

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



const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'm15__que';
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
  labels,
  methodParams
};

export default function ServiceQualityAdult({
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
