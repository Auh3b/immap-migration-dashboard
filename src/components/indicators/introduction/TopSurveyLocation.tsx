import { CategoryWidgetUI } from "@carto/react-ui";
import { Grid, Typography } from "@material-ui/core";
import { useMemo } from "react";
import groupCategories from "../utils/groupCategories";
import { descending } from "d3";
import TitleWrapper from "./utils/TitleWrapper";

const title = 'Total de encuestas por área de recolección'
const column = 'erm'
const subtitle = ''
export default function TopSurveyLocation(
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
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid item>
        <CategoryWidgetUI data={data}/>
      </Grid>
    </TitleWrapper>
  )
}
