import { HistogramWidgetUI, WrapperWidgetUI } from "@carto/react-ui";
import { max, min } from "d3";
import { defaultCustomWidgetProps } from "./customWidgetsType";

export default function CustomHistogramWidget({
  title, data
}: defaultCustomWidgetProps) {
  console.log(data)
  return (
    <WrapperWidgetUI
    title={title}
    >
      <HistogramWidgetUI 
      data={data}
      //@ts-ignore
      min={0}
      //@ts-ignore
      max={+max(data)}
      ticks={[1,2,3,4]}
      />
    </WrapperWidgetUI>
  )
}
