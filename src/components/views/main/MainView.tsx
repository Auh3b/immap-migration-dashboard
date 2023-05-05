import Desktop from './Desktop';
import Mobile from './Mobile';
import { useMediaQuery } from '@material-ui/core';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import { CustomTheme } from 'theme';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import PageFallback from 'components/common/PageFallback';
import { MainViewChildren } from './utils/types';

export default function MainView({ children }: { children: MainViewChildren }) {
  const { breakpoints }: CustomTheme = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [view, setView] = useState<null | ReactNode>(null);

  useEffect(() => {
    if (isMobile) {
      setView(<Mobile children={children} />);
    } else {
      setView(<Desktop children={children} />);
    }

    return () => {
      setView(null);
    };
  }, [breakpoints, isMobile]);

  return (
    <>
      <LazyLoadRoute fallback={<PageFallback />}>{view}</LazyLoadRoute>
    </>
  );
}
