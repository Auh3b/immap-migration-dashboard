import { AggregationTypes } from "@carto/react-core"

export interface BasicWidgetType {
  dataSource: string
  operation?: AggregationTypes
}