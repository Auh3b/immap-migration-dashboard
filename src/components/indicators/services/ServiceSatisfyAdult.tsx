import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import {
  aidTypes,
  serviceColors as colors,
  serviceLabels as labels,
} from './utils/serviceIndicatorTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import stackedGroupCategoriesAlt2 from '../utils/stackedGroupCategoriesAlt2';

const NOTE = 'Disposición para recomendar el servicio tomado    ';
const id = 'serviceSatisfaction';
const title = 'Recomendación del servicio';
const column = 'm12';
const valueColumn = 'm16';
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
