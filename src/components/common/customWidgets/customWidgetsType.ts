import { _FilterTypes } from '@carto/react-core';

export interface defaultCustomWidgetProps {
  title: string;
  id: string;
  dataSource: string;
  data: any[] | null;
  column: string;
  labels?: any;
  filterType: _FilterTypes;
  isLoading?: boolean;
}
