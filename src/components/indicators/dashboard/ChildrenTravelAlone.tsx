import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE =
  'Evidencia de niños, niñas y adolescentes (separados y no acompañados) en la ruta.';
const title = 'Presencia de NNA solos';
const id = 'travellingAlone';
const column = 'cb_fl_id15';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function ChildrenTravelAlone({ dataSource }: BasicWidgetType) {
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
