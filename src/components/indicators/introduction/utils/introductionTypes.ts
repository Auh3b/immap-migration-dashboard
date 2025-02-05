import { PropsWithChildren } from 'react';

export interface IndicatorProps extends PropsWithChildren<any> {
  data?: any[];
  isLoading?: Boolean;
}

export interface TitleWrapperProps extends IndicatorProps {
  title?: string;
  subtitle?: string;
}
