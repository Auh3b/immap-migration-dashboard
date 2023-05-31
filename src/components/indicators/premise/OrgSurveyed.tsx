import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'Nombre de la organización a la que pertenece el encuestado';
const id = 'organisationsSurveyed';
const title = ' Socio implementador';
const column = 'org_pert1';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
};

export default function OrgSurveyed({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomPieWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
