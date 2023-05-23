import { group } from 'd3';
import MethodFunc from './methodType';

const getHierarchy: MethodFunc = (input, column, params) => {
  const { levels } = params;
  const _reducedData = input.map((d) =>
    Object.fromEntries([
      [levels[0], d[levels[0]]],
      [levels[1], d[levels[1]]],
    ]),
  );
  const _data = group(
    _reducedData,
    (d) => d[levels[0]],
    (d) => d[levels[1]],
  );
  const _unpacked = Array.from(_data);
  let output: any[] = [];
  for (let [name, _childrenMap] of _unpacked) {
    let value = 0;
    const unpackedChilren = Array.from(_childrenMap);
    let children: any[] = [];
    for (let [childName, childrenArray] of unpackedChilren) {
      children = [
        ...children,
        { name: childName, value: childrenArray.length },
      ];
      value += childrenArray.length;
    }

    output = [...output, { name, value, children }];
  }
  // const _output = _unpacked.map(([name, childrenMap]) => {
  //   const children = Array.from(childrenMap).map(([child, chilren2]) => ({
  //     name: child,
  //     value: chilren2.length,
  //   }));
  //   return {
  //     name,
  //     value: children.length,
  //     children,
  //   };
  // });

  console.log(output);
  return output;
};

export default getHierarchy;
