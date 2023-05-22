import { flatGroup, group } from "d3"
import MethodFunc from "./methodType"

const getHierarchy: MethodFunc = (input, column, params) => {
  const { levels } = params
  const _data = group(input, d => d[levels[0]], d => d[levels[1]])
  const _unpacked = Array.from(_data)
  const _output = _unpacked.map(([name, childrenMap])=> {
    const children = Array.from(childrenMap).map(([child, chilren2]) =>({name: child, value: chilren2.length}))
    return {
      name,
      value: children.length,
      children
    }
  })

  console.log(_data)
  return _output
}

export default getHierarchy
