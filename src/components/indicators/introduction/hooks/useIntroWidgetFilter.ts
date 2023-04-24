import { useIntroFilters } from "./useIntroData";

export default function useIntroWidgetFilter({
  source,
  owner,
}:{
  source:string
  owner: string
}) {
  const filters = useIntroFilters()
  const currentFilter = filters[source]
  if(!currentFilter){
    return []
  }

  const isOwner = currentFilter[owner]
  
  if(!isOwner){
    return []
  }

  return filters[source][owner].values
}
