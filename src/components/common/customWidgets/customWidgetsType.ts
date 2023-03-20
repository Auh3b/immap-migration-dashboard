import { _FilterTypes } from '@carto/react-core';
import MethodFunc from 'components/indicators/utils/methodType';

export interface defaultCustomWidgetProps {
  title: string;
  id: string;
  dataSource: string;
  column: string;
  filterType: _FilterTypes;
  method?: MethodFunc;
  methodParams?: Record<string, unknown>;
  labels?: any;
  colorMap?: any;
  isLoading?: boolean;
  bins?: number;
  order?: any[];
  min?: number;
  max?: number;
  ticks?: number[];
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
}
