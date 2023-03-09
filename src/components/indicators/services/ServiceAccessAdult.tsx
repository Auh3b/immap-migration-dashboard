import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const labels = {
  1: 'Fácil',
  2: 'Regular',
  3: 'Difícil',
};

const NOTE = 'Percepción de accesibilidad a servicios humanitarios';
const id = 'accessServicesAdult';
const title = 'Accesibilidad';
const column = 'cb_fl_co_1';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  id,
  title,
  column,
  filterType,
  method,
  labels,
};

export default function ServiceAccessAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomPieWidget {...props} dataSource={dataSource} />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
