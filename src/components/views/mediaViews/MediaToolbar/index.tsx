import { Divider, Grid } from '@material-ui/core';
import { TimeInfo } from './TimeInfo';
import MediaViewMode from './MediaViewMode';

export default function index() {
  return (
    <Grid container alignItems='center' style={{ gap: '16px' }}>
      <TimeInfo />
      <Divider flexItem orientation={'vertical'} style={{ margin: '0 8px' }} />
      <MediaViewMode />
    </Grid>
  );
}
