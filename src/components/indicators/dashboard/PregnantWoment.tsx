import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE = 'Grupos de viaje con mujeres embarazadas';
const title = 'Identificación de gestantes';
const column = 'cb_fl_id12';
const id = 'pregnantWoment';
const method = groupCategories;
const filterType = _FilterTypes.IN;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function PregnantWoment({ dataSource }: BasicWidgetType) {
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
