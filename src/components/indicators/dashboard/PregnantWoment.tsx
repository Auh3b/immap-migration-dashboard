import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';

const NOTE = 'Grupos de viaje con mujeres embarazadas';
const title = 'Identificación de gestantes';
const column = 'cb_fl_id12';
const id = 'pregnantWoment';
const method = groupCategories;
const filterType = _FilterTypes.IN;

export default function PregnantWoment({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <CustomBarWidget
        id={id}
        title={title}
        column={column}
        dataSource={dataSource}
        filterType={filterType}
        method={method}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
