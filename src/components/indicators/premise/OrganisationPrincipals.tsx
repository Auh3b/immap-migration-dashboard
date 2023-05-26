import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';

const NOTE = 'Nombre de la organización a la que pertenece el encuestado ';
const id = 'organisationsPrincipals';
const title = 'Socio Principal';
const column = 'org_pert2';
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  id,
  title,
  column,
  filterType,
  method,
};

export default function OrganisationPrincipals({
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
