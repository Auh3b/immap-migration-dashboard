import { ComparativeCategoryWidgetUI, WrapperWidgetUI } from "@carto/react-ui";
import { useMemo, useState } from "react";
import { defaultCustomWidgetProps } from "./customWidgetsType";
import useWidgetFetch from "./hooks/useWidgetFetch";

const colors = [
  "#32a852",
  "#333",
  "#fa0",
  "#f27",
]

export default function CustomComparativeCategoryWidget({
  id,
  title,
  method,
  methodParams,
  column,
  labels,
  dataSource
}: defaultCustomWidgetProps) {
  const [data, setData] = useState<null|any[]>(null)
  const [names, setNames] = useState<null|string[]>(null)
  const {
    data: _data,
    isLoading,
    error
  } = useWidgetFetch({
    id,
    method,
    column,
    dataSource,
    methodParams
  })


  useMemo(()=>{
    let output:any[]
    if(_data){
      const _names = _data.map(([nameValue]) => nameValue)
      setNames(_names)
      const _packedData = _data.map(([name, value])=> Array.from(value))/*.map(([name, value])=>({name, value}))*/
      const _unpackedData = _packedData.map((group) => {
        let newGroup:any[] = []
        for (let d of group){
          newGroup.push({
            //@ts-ignore
            name: d[0], value: d[1]
          })
        }
        return newGroup
      })
      console.log(_unpackedData)
      setData(_unpackedData)
    }
  }, [_data])
  
  return (
  <WrapperWidgetUI
   title ={title}
   isLoading={isLoading}
  >
    {(data && names) && 
      <ComparativeCategoryWidgetUI
        data={data}
        // labels={labels}
        names={names}
        colors={colors}
      />
    }
  </WrapperWidgetUI>
  )
}
