import { _FilterTypes } from '@carto/react-core';
import { WidgetFetchMethod } from './hooks/useWidgetFetch';

export interface defaultCustomWidgetProps {
  title: string;
  id: string;
  dataSource: string;
  column: string;
  filterType: _FilterTypes;
  method?: WidgetFetchMethod;
  labels?: any;
  isLoading?: boolean;
}
