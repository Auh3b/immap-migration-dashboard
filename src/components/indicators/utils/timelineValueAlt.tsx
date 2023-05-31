import MethodFunc from './methodType';

const timelineValueAlt: MethodFunc = (input, column, params) => {
  const { iconGroupsConfig } = params;

  let output: Record<string, any>[] = [];

  for (let { name, color } of iconGroupsConfig) {
    const value = input.filter(
      ({ name: featureName }) => featureName === name
    ).length;
    const outputItem = {
      id: name,
      name,
      value,
      color: `rgb(${color.join(',')})`,
    };
    output = [...output, outputItem];
  }

  return output;
};

export default timelineValueAlt
