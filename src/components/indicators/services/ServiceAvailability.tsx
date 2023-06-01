import useWidgetEffect from '../utils/useWidgetEffect';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { Grid } from '@material-ui/core';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import { _FilterTypes } from '@carto/react-core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Aggregate Service Performance';
const id = 'aggregateServices';
const column = 'm12';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GET_SERVICE_AVAILABILITY;
const methodParams = {
  columns: ['m14', 'm15', 'm16'],
};

const NOTE = '';

const props = {
  title,
  id,
  column,
  filterType,
  methodName,
  methodParams,
};

export default function ServiceAvailability({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomColumnBarWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
