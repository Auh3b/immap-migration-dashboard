import { AggregationTypes } from '@carto/react-core'
import { CategoryWidget } from '@carto/react-widgets'
import { Grid } from '@material-ui/core'
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType'
import WidgetNote from 'components/common/customWidgets/WidgetNote'

const operationDefault = AggregationTypes.COUNT
const NOTE = 'Rango de edades de grupo de viaje'

export default function TravelGroupAges(
  {dataSource,operation}:BasicWidgetType) {
  return (
    <Grid item>
      <CategoryWidget
        id='travelGroupAges'
        title='Edades grupo de viaje'
        dataSource={dataSource}
        column='rango_edad'
        operation={operation ? operation : operationDefault}
        operationColumn='rango_edad'
      />
      <WidgetNote note={NOTE} />
  </Grid>
  )
}
