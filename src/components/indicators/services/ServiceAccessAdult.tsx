import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import {aidTypes, serviceColors as colors, serviceLabels as labels} from './utils/serviceIndicatorTypes';
import stackedGroupCategoriesAlt from '../utils/stackedGroupCategoryAlt';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';

const NOTE = 'Percepción de accesibilidad a servicios humanitarios';
const id = 'accessServicesAdult';
const title = 'Accesibilidad';
const column = 'e23__cua';
const valueColumn = 'm14_respec';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategoriesAlt;
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
