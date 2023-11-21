import { SideAnalyticsPanelProps } from 'components/common/sideAnalysticsPanel/sideAnalyticsPanelTypes';
import { ReactChild, ReactNode } from 'react';

export interface MainViewChildren {
  left?: View;
  middle?: View;
  right?: View;
  bottom?: View;
  side?: SideAnalyticsPanelProps;
}

interface View {
  element?: ReactChild | ReactNode;
  expandable?: Boolean;
}
