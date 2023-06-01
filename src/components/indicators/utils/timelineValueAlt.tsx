import { iconGroupsConfig } from 'components/layers/utils/surveyIconGroup';
import MethodFunc from './methodType';

const timelineValueAlt: MethodFunc<any[]> = (input, column, params) => {
  let output: any[] = [];

  for (let { name, color } of iconGroupsConfig) {
    const value = input.filter(
      ({ name: featureName }) => featureName === name,
    ).length;
    const outputItem = {
      id: name,
      name,
      value,
      color: `rgb(${color.join(',')})`,
    };
    output = [...output, outputItem];
  }

  console.log(output);

  return output;
};

export default timelineValueAlt;
