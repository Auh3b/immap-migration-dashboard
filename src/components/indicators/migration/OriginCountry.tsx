import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE = 'País de nacimiento del migrante que responde.';
const id = 'originCountry';
const title = 'País de nacimiento';
const column = 'e08_pais_';
const operationDefault = AggregationTypes.COUNT;
const filterType = _FilterTypes.IN;
const method = groupCategories;

const props = {
  id,
  title,
  column,
  filterType,
  method,
};

export default function OriginCountry({
  dataSource,
  operation,
}: BasicWidgetType) {
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
