import { PropsWithChildren } from 'react';

export interface IndicatorProps extends PropsWithChildren<any> {
  data?: any[];
  isLoading?: Boolean;
}

export interface TitleWrapperProps extends IndicatorProps {
  title?: string;
  subtitle?: string;
}

// export interface AggregateIndicatorProps extends TitleWrapperProps {
//   isLoading?: Boolean;
//   data: number;
//   icon: ReactNode;
//   gridSize?: number | Boolean | string;
//   formatter?: any;
//   extraContent?: extraContent;
// }
