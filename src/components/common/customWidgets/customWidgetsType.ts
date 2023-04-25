import { GroupDateTypes, _FilterTypes } from '@carto/react-core';
import { TIME_SERIES_CHART_TYPES } from '@carto/react-ui';
import MethodFunc from 'components/indicators/utils/methodType';

export interface defaultCustomWidgetProps {
  title: string;
  id: string;
  dataSource?: string;
  column: string;
  filterType: _FilterTypes;
  method?: MethodFunc;
  methodParams?: Record<string, unknown>;
  labels?: any;
  colorMap?: any;
  isLoading?: boolean;
  bins?: number;
  order?: string[] | string;
  chartType?: TIME_SERIES_CHART_TYPES;
  min?: number;
  stepSize?: GroupDateTypes;
  max?: number;
  ticks?: number[];
  stacked?: boolean;
  stepSizeOptions?: any;
  wrapperProps?: any;
  tooltip?: any;
  tooltipFormatter?: Function;
  formatter?: Function;
  showControls?: any;
  animation?: any;
  isPlaying?: Boolean;
  onPlay?: Function;
  isPaused?: Boolean;
  onPause?: Function;
  onStop?: Function;
  onTimelineUpdate?: Function;
  timeWindow?: any;
  onTimeWindowUpdate?: any;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  parentKey?: any;
  extraProps?: Record<string, unknown>;
}
