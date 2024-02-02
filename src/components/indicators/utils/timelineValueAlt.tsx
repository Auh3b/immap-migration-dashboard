import { iconGroupsConfig } from 'components/layers/utils/surveyIconGroup';
import MethodFunc from './methodType';

/**
 * Return an array of object  to populate a timeline chart
 */
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

  return output;
};

export default timelineValueAlt;
