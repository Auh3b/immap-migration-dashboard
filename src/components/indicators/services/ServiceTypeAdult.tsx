import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { aidTypes } from './utils/serviceIndicatorTypes';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'Ayudas humanitarias recibidas según zona de tránsito';
const id = 'Ayudas_humanitarias';
const title = 'Ayudas humanitarias';
const column = 'm12';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const labels = Object.fromEntries(aidTypes);

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
  labels,
};

export default function ServiceTypeAdult({ dataSource }: BasicWidgetType) {
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
