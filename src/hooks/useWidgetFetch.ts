import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import getTileFeatures from "utils/methods/getTileFeatures"

interface Method{
  (input: any[], column:string): any[]
}

interface useWidgetFetchProps {
  layerId: string
  column?: string
  mapRef: any
  source: any
  method?: Method | null
}

export default function useWidgetFetch({
  layerId, method=(input) => input, column, mapRef, source
}: useWidgetFetchProps) {
  const {viewport} = useSelector((state: RootState) => state.carto)
  const [data, setData] = useState<null|any[]>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useMemo(() => {
    if(mapRef){
      setIsLoading(true)
      //@ts-ignore
      const tileData = getTileFeatures({layerId, mapRef, viewport})
      let widgetData: any[]
      if(method){
        //@ts-ignore
        widgetData = method(tileData?.data, column)
      }
  
      if(error){
        setError(true)
      }else{
        //@ts-ignore
        setData(widgetData)
      }
      setIsLoading(false)
      return () => {
        setData(null)
        setIsLoading(false)
        setError(false)
      }
    }
  }, [viewport, mapRef, source])
  


  return {data, isLoading, error}
}