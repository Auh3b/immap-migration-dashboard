import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const labels = {
  1: 'Ubicaciones de la ayuda humanitaria',
};

const NOTE =
  'Tipo de información requerida sobre la ayuda humanitaria en la ruta';
const id = 'transitInformation';
const title = 'Necesidades de información';
const column = 'cb_fl_c_14';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  title,
  column,
  id,
  filterType,
  method,
  labels,
};

export default function TransitInfomation({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
