import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';

const id = 'Sexo';
const title = 'Sexo';
const column = 'identifica';
const filterType = _FilterTypes.IN;
const method = groupCategories;
const NOTE = 'Sexo de identificación del personal que responde la encuesta';

const props = {
  id,
  title,
  column,
  method,
  filterType,
};

export default function PremiseGenderComposition({
  dataSource,
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
