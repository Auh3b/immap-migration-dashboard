import { Grid } from "@material-ui/core";
import CustomStackedBarWidget from "components/common/customWidgets/CustomStackedBarWidget";
import { useMemo } from "react";

export default function SentimentPresentages({
  data: _data,
  isLoading
}:{
  data: any[];
  isLoading?: Boolean;
}) {

  const data = useMemo(()=>{
    
  }, [_data])

  return (
    <Grid>
      
    </Grid>
  )
}
