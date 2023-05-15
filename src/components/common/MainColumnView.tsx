import { ReactNode } from 'react';
import MainColumnTitle, { MainColumnTitleProps } from './MainColumnTitle';

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
