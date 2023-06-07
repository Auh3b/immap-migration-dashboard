import { ReactNode } from 'react';
import MainColumnTitle from './MainColumnTitle';

export interface MainColumnViewProps {
  children?: ReactNode;
}

export const MainColumnView = ({ children }: MainColumnViewProps) => {
  return (
    <>
      <MainColumnTitle />
      {children}
    </>
  );
};
