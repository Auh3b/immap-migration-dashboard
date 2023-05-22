import { useMemo } from "react";
import ReactEcharts from "./ReactEcharts";
import { UNICEF_COLORS } from "theme";
import { useTheme } from "@material-ui/core";

export default function TreeMapChart({
  data: _data
}:any) {
  const theme = useTheme()
  const series = useMemo(()=>{
    const data = [..._data]
    return [
      {
        type: 'treemap',
        leafDepth: 1,
        levels:[
          {itemStyle:{gapWidth: 5}},
          {itemStyle:{gapWidth: 1}}
        ],
        data,
      }
    ]
  }, [_data])

  const option = useMemo(()=>({
    // color: UNICEF_COLORS,
    tooltip: {
      show: true,
      padding: [theme.spacing(0.5), theme.spacing(1)],
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white,
      },
      //@ts-ignore
      backgroundColor: theme.palette.other.tooltip,
    },
    series
  }), [series, theme])
  return (
    <ReactEcharts option={option} />
  )
}
