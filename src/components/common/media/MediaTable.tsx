import { TableWidgetUI } from '@carto/react-ui'
import { useMemo } from 'react'
import TitleWrapper from '../TitleWrapper'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { randomUUID } from 'crypto'

interface ColumnConfig{
  field: string,
  headerName: string,
  sort: Boolean
}

const useStyles = makeStyles((theme)=>({
  root:{
  }, 
  paper:{
    height: '300px',
    '& > div':{
      height: '100%',
    }
  }
}))

export default function MediaTable({
  data, 
  columnConfig,
  source,
}:{
  data: any[]
  source: string
  columnConfig: any[] 
  sortBy?: string
  sortDirection?: 'asc'|'des'
}) {
  const classes = useStyles()
  const rows = useMemo(()=>{
    if(data.length){
      return data.filter(({source: parentSource})=> parentSource === source)
    }
    return []
  }, [data])
  console.log(rows)

  return (
    <Grid item xs={12} lg={4} className={classes.root}>
      <TitleWrapper title={`Top ${source} Posts`}>
        <Paper variant='outlined' className={classes.paper}>
          <DataGrid rows={rows} columns={columnConfig} />
        </Paper>
      </TitleWrapper>
    </Grid>
  )
}
