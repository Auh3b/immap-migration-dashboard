import { _FilterTypes } from "@carto/react-core"

export interface defaultCustomWidgetProps{
  title: string
  id: string
  dataSource: string
  data: any[]
  column: string
  labels?: any
  filterType: _FilterTypes
}