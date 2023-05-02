import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';
import { aidTypes } from './utils/serviceIndicatorTypes';
import groupCategories from '../utils/groupCategories';

const NOTE = 'Ayudas humanitarias recibidas según zona de tránsito';
const id = 'serviceTypeAdult';
const title = 'Ayudas humanitarias';
const column = 'm18_me_con';
const filterType = _FilterTypes.IN;
const method = groupCategories;
const labels = Object.fromEntries(aidTypes);

const props = {
  id,
  title,
  column,
  filterType,
  method,
  labels,
};

export default function ServiceTypeChildren({ dataSource }: BasicWidgetType) {
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
