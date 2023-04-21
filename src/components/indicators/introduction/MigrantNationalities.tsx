import { PieWidgetUI } from '@carto/react-ui';
import { useMemo } from 'react'
import groupCategories from '../utils/groupCategories';
import { Grid, Typography } from '@material-ui/core';

const title = 'Nacionalidad de la persona conectada'
const column = 'e08_pais_'

export default function MigrantNationalities({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(()=>{
    if(_data){
      return groupCategories(_data, column)
    }
    return []
  }, [_data])
  return (
    <Grid item container direction='column'>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <PieWidgetUI data={data}/>
      </Grid>
    </Grid>
  )
}
