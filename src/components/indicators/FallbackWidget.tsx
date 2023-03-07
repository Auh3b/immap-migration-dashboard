import { Skeleton } from '@material-ui/lab';

export default function FallbackWidget() {
  return (
    <div>
      <Skeleton width={'100'} />
      <Skeleton width={'75'} />
      <Skeleton width={'50'} />
    </div>
  );
}
