import { Suspense } from 'react';
import PageFallback from './PageFallback'

export default function LazyLoadComponent({
  children,
  fallback = (<PageFallback />),
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
