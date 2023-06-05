import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import {
  serviceTypeChildren,
  serviceColors as colors,
  serviceLabels2 as labels,
} from './utils/serviceIndicatorTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'm18_1';
const valueColumn = 'm20';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2;
const methodParams = {
  aidTypes: serviceTypeChildren,
  labels,
  valueColumn,
};

const extraProps = {
  labels,
  colors,
  parentSource: 'mainSource',
  parentColumn: 'm18_me_con',
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
  parentKey: serviceTypeChildren,
};

export default function ServiceQualityChildren({
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
