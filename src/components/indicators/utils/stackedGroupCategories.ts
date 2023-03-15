import { rollup } from "d3"

const stackedGroupCategories = (
  input: any[],
  column: string,
  methodParams?: Record<string, unknown>)=>{
  
  //@ts-ignore
  const { CATEGORY_ABREVATIONS, labels } = methodParams
  const values:any[] = []

  for (let f of input){
    const value = f[column].split(',')
    const key = f['e23__cua'].split(',')
    
    for(let i =0; i < key.length; i++){
      if(value[i]){
        values.push({
          key: CATEGORY_ABREVATIONS.get( +key[i]),
          value: labels.get( +value[i])
        })
      }else{
        values.push({
          key: CATEGORY_ABREVATIONS.get( +key[i]),
          value: labels.get(0) 
        })
      }
    }
  }

  const groups = rollup(values, v => v.length, d => d.value, d => d.key)
  
  
  return Array.from(groups)
}

export default stackedGroupCategories