import { ReactChild, ReactNode } from 'react';

export interface MainViewChildren {
  left?: ReactChild;
  middle?: ReactChild | ReactNode;
  right?: ReactChild;
  bottom?: ReactChild;
}
