import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useGetPathname() {
  const location = useLocation();

  const pathname = useMemo(
    () => location.pathname.split('/').at(-1) || '',
    [location],
  );

  return pathname;
}
