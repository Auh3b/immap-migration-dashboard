import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';

const title = 'Identificación NNA solos';
const NOTE =
  'Lugares donde se evidencian niños, niñas y adolescentes (separados y no acompañados) en la ruta';
const column = 'cb_fl_id_1';
const id = 'placesChildrenTravelAlone';
const filterType = _FilterTypes.IN;
const method = groupCategories

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function PlacesChildrenTravelAlone({
  dataSource,
}: BasicWidgetType) {
  return (
    <Grid item>
      <CustomCategoryWidget dataSource={dataSource} {...props} />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
