import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';

const title = 'Identificación de personas con condición de discapacidad';
const NOTE =
  'Personas con alguna condición de discapacidad (física, visual, auditiva, intelectual, etc.)';
const id = 'disabledPeople';
const column = 'cb_fl_id14';
const filterType = _FilterTypes.IN;
const method = groupCategories;

export default function PeopleWithDisability({ dataSource }: BasicWidgetType) {
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
