import { AggregationTypes, groupValuesByColumn, _FilterTypes } from '@carto/react-core'
import { Grid } from '@material-ui/core'
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType'
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget'
import WidgetNote from 'components/common/customWidgets/WidgetNote'

const method = (input:any[], column:string) =>{
  return groupValuesByColumn({
    data: input,
    valuesColumns: [column],
    keysColumn: column,
    operation: AggregationTypes.COUNT
  })
}

const NOTE = 'Personas que alguna vez han debido restringir alimentos durante la ruta'
const id = 'restrictedFood'
const title = 'Población que ha restringido alimentación'
const column = 'restringir'
const filterType = _FilterTypes.IN

export default function RestrictFood({dataSource}:BasicWidgetType) {
  return (
    <Grid item>
      <CustomBarWidget 
        id={id}
        title={title}
        column={column}
        dataSource={dataSource}
        filterType={filterType}
        method={method}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  )
}
