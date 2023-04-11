import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const title = 'Personas en condición de discapacidad';
const NOTE =
  'Personas con alguna condición de discapacidad (física, visual, auditiva, intelectual, etc.)';
const id = 'disabledPeople';
const column = 'm03__dent';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function PeopleWithDisability({ dataSource }: BasicWidgetType) {
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
