import { useEffect, ReactNode, useState } from 'react';

export default function useWidgetEffect(
  widgetComponent: ReactNode,
  deps: any[],
) {
  const [widget, setWidget] = useState<null | ReactNode>(null);
  useEffect(() => {
    setWidget(widgetComponent);
    return () => {
      setWidget(null);
    };
  }, deps);

  return {
    widget,
  };
}
