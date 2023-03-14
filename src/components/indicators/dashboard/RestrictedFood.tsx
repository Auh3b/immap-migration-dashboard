import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const method = groupCategories;

const NOTE =
  'Personas que alguna vez han debido restringir alimentos durante la ruta';
const id = 'restrictedFood';
const title = 'Población que ha restringido alimentación';
const column = 'e15__has_';
const filterType = _FilterTypes.IN;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function RestrictFood({ dataSource }: BasicWidgetType) {
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
