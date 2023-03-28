import { WrapperWidgetUI } from '@carto/react-ui';
import { ReactNode } from 'react';

export default function CustomWidgetWrapper({
  title,
  isLoading,
  onError,
  children,
}: {
  title: string;
  onError?: any;
  isLoading: Boolean;
  children: ReactNode;
}) {
  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} onError={onError}>
      {children}
    </WrapperWidgetUI>
  );
}
