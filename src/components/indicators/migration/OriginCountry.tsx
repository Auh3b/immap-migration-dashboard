import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'País de nacimiento del migrante que responde.';
const id = 'originCountry';
const title = 'País de nacimiento';
const column = 'e08_pais_';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
};

export default function OriginCountry({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
