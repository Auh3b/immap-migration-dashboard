import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import TreeMapWidget from 'components/common/customWidgets/TreeMapWidget';
import getHierarchy from '../utils/getHierarchy';

const NOTE = 'Nombre de la organización a la que pertenece el encuestado ';
const id = 'organisationsPrincipals';
const title = 'Socio Principal';
const column = 'org_pert2';
const filterType = _FilterTypes.IN;
const method = getHierarchy;
const methodParams = {
  levels: ['org_pert1','org_pert2']
}

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams
};

export default function ImplementorsPrincipalTree({
  dataSource,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <TreeMapWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}