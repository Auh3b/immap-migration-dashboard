import { Grid } from '@material-ui/core';
import { TimeInfo } from './TimeInfo';
import MediaViewMode from './MediaViewMode';

export default function index() {
  return (
    <Grid container alignItems='center' style={{ gap: '16px' }}>
      <TimeInfo />
      <MediaViewMode />
    </Grid>
  );
}
