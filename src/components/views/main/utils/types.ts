import { ReactChild, ReactNode } from 'react';

export interface MainViewChildren {
  left?: View;
  middle?: View;
  right?: View;
  bottom?: View;
}

interface View {
  element: ReactChild | ReactNode;
  expandable?: Boolean;
}
