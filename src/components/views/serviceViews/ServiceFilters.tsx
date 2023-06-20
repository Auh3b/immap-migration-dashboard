import { Grid } from '@material-ui/core'
import ServicesByPush from './ServicesByPush'
import ServiceStrictDateFilter from './ServiceStrictDateFilter'

export default function ServiceFilters() {
  return (
    <Grid container direction='column' item>
      <ServiceStrictDateFilter />
      <ServicesByPush />
    </Grid>
  )
}
