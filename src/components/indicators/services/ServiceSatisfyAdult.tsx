import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import {
  aidTypes,
  serviceColors as colors,
  serviceLabels3 as labels,
} from './utils/serviceIndicatorTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'Disposición para recomendar el servicio tomado    ';
const id = 'serviceSatisfaction';
const title = 'Recomendación del servicio';
const column = 'm12';
const valueColumn = 'm16';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2;
const methodParams = {
  aidTypes,
  labels,
  valueColumn,
};

const extraProps = {
  labels,
  colors,
  parentSource: 'mainSource',
  parentColumn: 'e23__cua',
};

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
  methodParams,
  labels,
  extraProps,
  parentKey: aidTypes,
  global: false,
};

export default function ServiceSatisfyAdult({
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
