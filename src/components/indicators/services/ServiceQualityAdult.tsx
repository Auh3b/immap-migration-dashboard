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
  1: 'Satisfecho',
  2: 'Algo satisfecho',
  3: 'Insatisfecho',
};

const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'cb_fl_co_2';
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

export default function ServiceQualityAdult({
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
