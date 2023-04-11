import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const method = groupCategories;

const NOTE =
  'Personas con alguna enfermedad crónica (diabetes, hipertensión, asma, etc.)';
const id = 'sickPeople';
const title = 'Personas con enfermedades crónicas';
const column = 'm02__en_t';
const filterType = _FilterTypes.IN;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function SickPeople({ dataSource }: BasicWidgetType) {
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
