import { _FilterTypes } from "@carto/react-core";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import CustomSunburstWidget from "components/common/customWidgets/CustomSunburstWidget";
import WidgetNote from "components/common/customWidgets/WidgetNote";
import { scaleOrdinal, schemeSet3, sum } from "d3";
import groupCategories from "../utils/groupCategories";
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

function getColorScale(range:string[]){
  return scaleOrdinal().domain(range).range(schemeSet3)
}

function getColors(input:any[], columns:string[]){
  const values:string[] = []
  
  for(let column of columns){
    for(let i=0; i < input.length; i++){
      values.push(input[i][column])
    }
  }

  const uniqueValues = Array.from(new Set(values))
  const colorScale = getColorScale(uniqueValues)

  const valueColor = new Map()

  for(let value of uniqueValues){
    valueColor.set(value, colorScale(value))
  }

  return valueColor
}

function getHierarchy(input:any[],column:string, params?:Record<any,any>){
  //@ts-ignore
  const levels = [column, params.lv2, params.lv3]
  const colors = getColors(input, levels)
  let children = groupCategories(input,column)
  const childrenNames = children.map(({name})=> name)
  
  const nest:any[] = []

  for (let i = 0; i < childrenNames.length; i++){
    const name = childrenNames[i]
    const slice = getFilteredInput(input, column, name)
    const children =  getChildren(slice, levels[1])
    const childrenNamesLv2 = children.map(({name})=> name)
    const value = getChildrenLength(children)
    const itemStyle = {
      color: colors.get(name) || '#999999'
    }
    const newChildren:any[] = []
    for (let j = 0; j < childrenNamesLv2.length; j++){
      const name = childrenNames[j]
      const slice = getFilteredInput(input, column, name)
      const children =  getChildren(slice, levels[2])
      const value = getChildrenLength(children)
      const itemStyle = {
        color: colors.get(name) || '#999999'
      }
      
      newChildren.push({
        name,
        value,
        children: children.map(d => ({...d, itemStyle: {color: colors.get(d.name)}})),
        itemStyle
      })
    }

    nest.push({
      name,
      value,
      children: newChildren,
      itemStyle
    })
  }

  return {
    data: nest,
    legend: Object.fromEntries(colors)
  } 
}

const NOTE = 'Migración de flujo de país';
const id = 'Country Flow';
const title = 'Migración de flujo de país';
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
