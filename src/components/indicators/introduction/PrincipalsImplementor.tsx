import { CategoryWidgetUI } from "@carto/react-ui";
import { Grid, Typography } from "@material-ui/core";
import { useMemo } from "react";
import groupCategories from "../utils/groupCategories";
import { descending } from "d3";
import aggregateColumns from "../utils/AggregateColumns";
import { AggregationTypes } from "@carto/react-core";

const title = 'Socios implementadores/Principales'
const columns = [['org_pert1'],['org_pert2']]
export default function PrincipalsImplementor(
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
      const principles = aggregateColumns(_data, columns[0], AggregationTypes.COUNT)
      const implementors = aggregateColumns(_data, columns[1], AggregationTypes.COUNT)
      return [
        {
          name: 'Principales', 
          value: principles,
        },
        {
        name: 'Implementadores', 
        value: implementors
        }
      ]
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
