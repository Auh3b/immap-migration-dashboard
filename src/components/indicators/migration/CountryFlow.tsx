import { _FilterTypes } from "@carto/react-core";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import CustomSunburstWidget from "components/common/customWidgets/CustomSunburstWidget";
import WidgetNote from "components/common/customWidgets/WidgetNote";
import { hierarchy, rollup, sum } from "d3";
import groupCategories from "../utils/groupCategories";
import MethodFunc from "../utils/methodType";
import useWidgetEffect from "../utils/useWidgetEffect";


function getChildrenLength(input:any[]):number{
  return sum(input, v => v.value)
}

function getChildren(input:any[], column:string):any[]{
  return groupCategories(input, column)
}

function getFilteredInput(input:any[], column:string, value:string):any[]{
  return input.filter(d => d[column] === value)
}

function getHierarchy(input:any[],column:string, params?:Record<any,any>){
  //@ts-ignore
  const levels = [column, params.lv2, params.lv3]
  let children = groupCategories(input,column)
  const childrenNames = children.map(({name})=> name)
  
  const nest:any[] = []

  for (let i = 0; i < childrenNames.length; i++){
    const name = childrenNames[i]
    const slice = getFilteredInput(input, column, name)
    const children =  getChildren(slice, levels[1])
    const childrenNamesLv2 = children.map(({name})=> name)
    const value = getChildrenLength(children)
    const newChildren:any[] = []
    for (let j = 0; j < childrenNamesLv2.length; j++){
      const name = childrenNames[j]
      const slice = getFilteredInput(input, column, name)
      const children =  getChildren(slice, levels[2])
      const value = getChildrenLength(children)
      const childrenNamesLv3 =  children.map(({name})=> name)
      console.log(childrenNames[i], childrenNamesLv2[j], childrenNamesLv3)
      newChildren.push({
        name,
        value,
        children
      })
    }

    nest.push({
      name,
      value,
      children: newChildren
    })
  }

  return [...nest] 
}

// const getHierarchy:MethodFunc = (input,column, params) => {
//   // console.log(input)

//   // const nest = {
//   //   children: []
//   // }
//   //@ts-ignore
//   const { levels } = params
//   const keys = [column, ...levels]

//   // @ts-ignore
//   const children = groupCategories(input,column)
//   console.log(children)
//   return {
//     children
//   }
// }

const NOTE = 'País desde donde inicia el flujo migratorio';
const id = 'Country Flow';
const title = 'País inicial de flujo migratorio';
const column = 'e08_pais_';
const filterType = _FilterTypes.IN;
const method = getHierarchy;
const methodParams = {
  lv2: 'e10_pais_',
  lv3: 'e12_pais_'
}

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams
};


export default function CountryFlow({
dataSource
}:BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomSunburstWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
  <Grid item>
    {widget}
    <WidgetNote note={NOTE} />
  </Grid>
  )
}
