import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import {
  aidTypes,
  serviceColors as colors,
  serviceLabels1 as labels,
} from './utils/serviceIndicatorTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import stackedGroupCategoriesAlt2 from '../utils/stackedGroupCategoriesAlt2';

const NOTE = 'Percepción de accesibilidad a servicios humanitarios';
const id = 'accessServicesAdult';
const title = 'Accesibilidad';
const column = 'm12';
const valueColumn = 'm14';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategoriesAlt2;
const methodParams = {
  aidTypes,
  labels,
  valueColumn,
};
const extraProps = {
  labels,
  colors,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
  parentKey: aidTypes,
  extraProps,
  global: false,
};

export default function ServiceAccessAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomColumnBarWidget {...props} dataSource={dataSource} />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
