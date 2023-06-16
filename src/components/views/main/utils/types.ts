import { SidePanelChildrenProps } from 'components/common/sideAnalysticsPanel/sideAnalyticsPanelTypes';
import { ReactChild, ReactNode } from 'react';

export interface MainViewChildren {
  left?: View;
  middle?: View;
  right?: View;
  bottom?: View;
  side?: SidePanelChildrenProps;
}

interface View {
  element?: ReactChild | ReactNode;
  expandable?: Boolean;
}
