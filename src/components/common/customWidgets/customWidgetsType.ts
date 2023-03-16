import { _FilterTypes } from '@carto/react-core';
import { WidgetFetchMethod } from './hooks/useWidgetFetch';

export interface defaultCustomWidgetProps {
  title: string;
  id: string;
  dataSource: string;
  column: string;
  filterType: _FilterTypes;
  method?: WidgetFetchMethod;
  methodParams?: Record<string, unknown>;
  labels?: any;
  colorMap?: any;
  isLoading?: boolean;
  bins?:number;
  order?: any[];
  min?: number;
  max?: number;
  ticks?: number[];
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
}
