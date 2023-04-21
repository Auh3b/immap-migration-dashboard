import { CategoryWidgetUI } from "@carto/react-ui";
import { Grid, Typography } from "@material-ui/core";
import { useMemo } from "react";
import groupCategories from "../utils/groupCategories";
import { descending } from "d3";

const title = 'Top de 5 organizaciones'
const column = 'org_pert1'
export default function TopOrganisations(
  {
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}
) {
  const data = useMemo(()=>{
    if(_data){
      const category = groupCategories(_data, column)
      //@ts-ignore
      const top5 = category.sort((a, b) => descending(a.value, b.value))
      return top5.slice(0, 5)
    }
  }, [_data])
  return (
    <Grid item container direction='column'>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <CategoryWidgetUI data={data}/>
      </Grid>
    </Grid>
  )
}
