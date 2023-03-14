import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { CategoryWidget, getCategories } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import groupCategories from '../utils/groupCategories';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';

const NOTE = 'Distribución de tamaño de grupo de viaje';
const title = 'Tamaño de grupo de viaje';
const id = 'tripComposition';
const column = 'e17__cua';
const operationDefault = AggregationTypes.COUNT;
const method = groupCategories
const filterType = _FilterTypes.IN

const props = {
  id,
  title,
  column,
  method,
  filterType
};

export default function GroupSizeDistribution({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget
    {...props}
    dataSource={dataSource}
    />
    // <CategoryWidget
    //   {...props}
    //   dataSource={dataSource}
    //   operation={operation ? operation : operationDefault}
    // />
    ,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
